import { isLoggedIn, logoutAction } from '@/app/actions/auth';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <Link
      className="hover:text-dark-accent px-6 py-3 inline-block font-bold"
      href={href}
    >
      {children}
    </Link>
  );
}

function LogoutForm() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="hover:text-dark-accent px-6 py-3 inline-block font-bold bg-transparent border-none cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
}

export default async function Navigation() {
  const loggedIn = await isLoggedIn();

  return (
    <nav className="flex justify-between bg-light-accent w-full border-b-1 border-light-accent2">
      {loggedIn && (
        <>
          <ul className="flex gap-4 mx-4">
            <NavItem href="/events">Events</NavItem>
          </ul>
          <ul className="flex gap-4 mx-4">
            <li>
              <LogoutForm />
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}
