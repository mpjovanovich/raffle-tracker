import { isLoggedIn } from '@/app/actions/auth';
import SignupPage from '@/components/page/signup/SignupPage';
import { redirect } from 'next/navigation';

export default async function Page() {
  const loggedIn = await isLoggedIn();
  if (loggedIn) {
    redirect('/');
  }

  return <SignupPage />;
}
