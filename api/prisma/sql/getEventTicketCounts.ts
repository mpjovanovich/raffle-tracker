import { PrismaClient } from '@prisma/client';

export async function getTicketCounts(prisma: PrismaClient, eventId: number) {
  return await prisma.$queryRaw`
WITH ValidTickets AS (
  SELECT
    c.number as contest_number,
    o.status as order_status,
    t.id as ticket_id,
    h.winner
  FROM
    Ticket t
    JOIN [Order] o ON t.order_id = o.id
      AND o.status != 'CANCELLED'
      AND o.status != 'REFUNDED'
    JOIN Contest c ON t.contest_id = c.id
    JOIN Horse h ON t.horse_id = h.id
  WHERE
    t.event_id = ${eventId}
)
, TotalTicketCounts AS (
  SELECT
    t.contest_number,
    COUNT(*) as total_ticket_count
  FROM
    ValidTickets t
  GROUP BY
    t.contest_number
)
, WinningTicketCounts AS (
  SELECT
    t.contest_number,
    COUNT(*) as winning_ticket_count
  FROM
    ValidTickets t
  WHERE
    t.winner = 1
  GROUP BY
    t.contest_number
)
, UnclaimedWinningTicketCounts AS (
  SELECT
    t.contest_number,
    COUNT(*) as unclaimed_winning_ticket_count
  FROM
    ValidTickets t
  WHERE
    t.winner = 1
    AND t.order_status == 'ISSUED'
  GROUP BY
    t.contest_number
)
SELECT
  t.contest_number,
  t.total_ticket_count,
  w.winning_ticket_count,
  u.unclaimed_winning_ticket_count
FROM 
  TotalTicketCounts t
  JOIN WinningTicketCounts w ON t.contest_number = w.contest_number
  JOIN UnclaimedWinningTicketCounts u ON t.contest_number = u.contest_number
`;
}
