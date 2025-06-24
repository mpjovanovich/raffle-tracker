import CashierPage from '@/components/page/cashier/CashierPage';
import { requireAuth } from '@/utils/cookieUtility';
import { ROLE } from '@raffle-tracker/dto';

export default async function Page() {
  await requireAuth([ROLE.CASHIER]);
  return <CashierPage />;
}
