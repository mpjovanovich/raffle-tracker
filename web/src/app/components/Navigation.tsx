import Link from 'next/link';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <li>
      <Link
        className="hover:bg-light-accent2 px-6 py-4 inline-block font-bold"
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export default function Navigation() {
  return (
    <nav className="flex justify-between bg-light-accent w-full border-b-1 border-light-accent2">
      <ul className="flex gap-4 mx-4">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/events">Events</NavItem>
      </ul>
      <ul className="flex gap-4 mx-4">
        <NavItem href="/">TODO: Login</NavItem>
      </ul>
    </nav>
  );
}
