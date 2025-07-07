import { isLoggedIn } from '@/app/actions/auth';
import LoginPage from '@/components/page/login/LoginPage';
import { redirect } from 'next/navigation';

export default async function Page() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect('/');
  }

  return <LoginPage />;
}
