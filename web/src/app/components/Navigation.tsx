import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="w-40 md:w-60 lg:w-60 border-r p-4">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
      </ul>
    </nav>
  );
}
