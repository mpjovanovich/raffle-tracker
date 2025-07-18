'use client';

import Card from '@/components/ui/Card';
import { RevenueReport } from '@raffle-tracker/dto';

interface RevenueReportPageProps {
  revenueReport: RevenueReport;
}

export default function RevenueReportPage({
  revenueReport,
}: RevenueReportPageProps) {
  return (
    <div className="space-y-8">
      {/* Event Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {revenueReport.eventName}
        </h1>
        <p className="text-lg text-gray-600">
          Ticket Price: ${revenueReport.ticketPrice.toFixed(2)}
        </p>
      </div>

      {/* Event Summary */}
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
          Event Summary
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">
              Total Ticket Revenue
            </span>
            <span className="text-xl font-bold text-gray-900">
              ${revenueReport.totalTicketDollarAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">
              Total Winning Ticket Payout
            </span>
            <span className="text-xl font-bold text-green-700">
              ${revenueReport.totalWinningTicketDollarAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">
              Total Unclaimed Payout
            </span>
            <span className="text-xl font-bold text-orange-700">
              $
              {revenueReport.totalUnclaimedWinningTicketDollarAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
            <span className="text-gray-900 font-semibold text-lg">
              Net Revenue
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ${revenueReport.netTicketDollarAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* Contest Details */}
      <h2 className="px-6 mb-2 text-2xl font-semibold text-gray-900">
        Contest Breakdown
      </h2>

      {revenueReport.contests.map(contest => (
        <Card key={contest.contestNumber}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Contest #{contest.contestNumber}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Tickets Sold:</span>
                <span className="ml-2 font-semibold">
                  {contest.totalTicketCount}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Winning Tickets:</span>
                <span className="ml-2 font-semibold">
                  {contest.winningTicketCount}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Unclaimed Tickets:</span>
                <span className="ml-2 font-semibold">
                  {contest.unclaimedWinningTicketCount}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Ticket Revenue</span>
                <span className="font-semibold text-gray-900">
                  ${contest.totalTicketDollarAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Winning Ticket Payout</span>
                <span className="font-semibold text-green-700">
                  ${contest.winningTicketDollarAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Unclaimed Payout Amount</span>
                <span className="font-semibold text-orange-700">
                  ${contest.unclaimedWinningTicketDollarAmount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-gray-900 font-semibold">Net Revenue</span>
                <span className="text-lg font-bold text-gray-900">
                  ${contest.netTicketDollarAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
