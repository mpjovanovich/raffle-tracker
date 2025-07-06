import { isLoggedIn } from '@/app/actions/auth';
import ResetPasswordPage from '@/components/page/resetPassword/ResetPasswordPage';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function Page({ params }: PageProps) {
  const loggedIn = await isLoggedIn();
  const { token } = await params;

  if (loggedIn || !token) {
    redirect('/');
  }

  return <ResetPasswordPage token={token} />;
}
