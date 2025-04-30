"use client";
import { fontClasses } from "@/app/_interfaces/FontClasses";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav
        className={`bg-[var(--navbar-backGround)] h-[132px] ${fontClasses.spartan}`}
      >
        <div className="container h-full py-3 flex justify-between items-start flex-col">
          <div>
            <Link href={"/"} prefetch={false} className="font-light">
              Home
            </Link>
            <FontAwesomeIcon icon={faAngleRight} className="px-2" />
            <Link href={"/"} prefetch={false} className="font-light">
              Courses
            </Link>
            <FontAwesomeIcon icon={faAngleRight} className="px-2" />
            <Link href={"/"} prefetch={false}>
              Course Details
            </Link>
          </div>
          <div>
            <h1 className="text-[35px] font-semibold">
              Starting SEO as your Home
            </h1>
          </div>
        </div>
      </nav>
    </>
  );
}
