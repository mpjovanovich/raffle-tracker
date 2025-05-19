'use client';

import Card from './ui/Card';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <Card>
      <h1 className="text-4xl font-bold mb-6">Error</h1>
      <p className="text-lg italic">{error && error.message}</p>
    </Card>
  );
}
