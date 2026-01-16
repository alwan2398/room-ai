import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { navItems } from "@/constant/NavItemsConst";

const Header = () => {
  return (
    <header className="sticky top-0 right-0 left-0 z-30">
      <nav className="h-16 border-b bg-background py-4">
        <div
          className="w-full max-w-6xl mx-auto
         flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold font-mono">Design AI</h2>

          <div
            className="hidden flex-1 items-center
          justify-center gap-8 md:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted-foreground text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button variant="default" size="sm" className="hidden md:block">
            Login
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
