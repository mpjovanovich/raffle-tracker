import { checkAuth } from '@/app/actions/auth';
import CashierPage from '@/components/page/cashier/CashierPage';
import { ROLE } from '@raffle-tracker/dto';

export default async function Page() {
  await checkAuth([ROLE.CASHIER]);
  return <CashierPage />;
}
