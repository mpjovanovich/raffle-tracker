import ResetPasswordPage from '@/components/page/resetPassword/ResetPasswordPage';

interface PageProps {
  params: { token: string };
}

export default async function Page({ params }: PageProps) {
  const { token } = await params;

  return <ResetPasswordPage token={token} />;
}
