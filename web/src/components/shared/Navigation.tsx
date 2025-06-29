'use client';

import { isLoggedIn, logoutAction } from '@/app/actions/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Pathname is the current path of the page.  The Nav component will persist
  // across pages since it's in the top level layout, and by default will not
  // re-render.  We're using this hook to check if the user is logged in when
  // the pathname (page) changes.
  const pathname = usePathname();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = await isLoggedIn();
      setLoggedIn(loggedIn);
    };
    checkLoggedIn();
  }, [pathname]);

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
