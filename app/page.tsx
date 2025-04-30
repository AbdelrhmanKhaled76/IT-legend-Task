"use client";
import Image from "next/image";
import videoImage from "/public/images/video-image.png";
import user_1 from "/public/images/user-1.png";
import user_2 from "/public/images/user-2.png";
import user_3 from "/public/images/user-3.png";
import { ChangeEvent, FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faBook,
  faChalkboardUser,
  faGlobe,
  faGraduationCap,
  faMoneyBill,
  faPlay,
  faSheetPlastic,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { formData } from "./_interfaces/FormData";
import { fontClasses } from "./_interfaces/FontClasses";
import SideSection from "./_components/Layout/sideSection";
import dynamic from "next/dynamic";

export default function Home() {
  //lazy loading the overView
  const OverView = dynamic(() => import("./_components/ui/overView"), {
    ssr: false,
    loading: () => <></>,
  });

  const ExamView = dynamic(() => import("./_components/ui/ExamView"), {
    ssr: false,
    loading: () => <></>,
  });

  // making two variables one for playing the video with a button
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoUrl: string = isPlaying
    ? "https://www.youtube.com/embed/vN4iSTbNnfQ?autoplay=1&mute=1"
    : "";

  // form state
  const [formData, setFormData] = useState<formData>({
    comment: "",
  });

  //two function one for change handling and the other for form submit
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit feedback");
      }

      const data = await response.json();
      console.log("Success:", data);
      // Reset form or show success message
      setFormData({ comment: "" });
    } catch (err: any) {
      console.error("Error:", err);
      // Show error to user
      alert(err.message || "An error occurred");
    }
  };

  return (
    <main className="py-5 relative inset-0 container mx-auto grid grid-cols-1 xl:grid-cols-3 gap-10">
      <section className="relative inset-0 col-span-1 xl:col-span-2">
        <figure className="sticky top-2 left-0 z-20 md:relative  md:z-0">
          <div className="flex justify-center items-center w-full aspect-video">
            {/* making a condition to display image above the video  */}
            {isPlaying ? (
              <iframe
                src={videoUrl}
                title="Course Video"
                allow="autoplay"
                allowFullScreen
                className="rounded  w-full h-full"
                loading="lazy"
              ></iframe>
            ) : (
              <>
                <div className="rounded w-full h-full object-center absolute top-0 left-0 bg-black opacity-70 z-10"></div>
                <Image
                  width={1200}
                  height={800}
                  src={videoImage}
                  alt="Click to play video"
                  className="rounded w-full h-full object-center"
                  priority
                />
                <button
                  title="Play Video"
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute cursor-pointer bg-[#ffffff] w-[70px] h-[70px] rounded-full text-[#e54860] text-[20px] flex justify-center items-center z-20"
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </>
            )}
          </div>
        </figure>
        <ul className="flex justify-baseline items-center py-6">
          <li>
            <a
              title="facebook icon"
              href="https://www.facebook.com/profile.php?id=61558287021472"
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="px-3 py-2 rounded-full border border-gray-300 text-gray-500 me-4 duration-500 transition-all hover:bg-[#0866ff] hover:text-white"
              />
            </a>
          </li>
          <li>
            <a
              title="twitter icon"
              href="https://www.instagram.com/itlegendcourses"
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="px-2 py-2 rounded-full border border-gray-300 text-gray-500 me-4 duration-500 transition-all hover:bg-[#01a3f2] hover:text-white"
              />
            </a>
          </li>
          <li>
            <a
              title="linked in icon"
              href="https://www.linkedin.com/company/it-legend/posts/?feedView=all&viewAsMember=true"
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="px-2 py-2 rounded-full border border-gray-300 text-gray-500 me-4 duration-500 transition-all hover:bg-[#0a66c2] hover:text-white"
              />
            </a>
          </li>
          <li>
            <a
              title="youtupe icon"
              href="https://www.youtube.com/channel/UC69wfFX_sw6k8e6ArDgQJIw"
              className="cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faYoutube}
                className="px-2 py-2 rounded-full border border-gray-300 text-gray-500 me-4 duration-500 transition-all hover:bg-[#ff0033] hover:text-white"
              />
            </a>
          </li>
        </ul>
        <section className="w-full">
          <h2 className={`${fontClasses.spartan} font-medium text-[30px] py-5`}>
            Course Materials
          </h2>
          <div className="bg-white p-10 rounded grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 shadow-md">
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon icon={faClock} className="pe-3 text-[20px]" />
                <p>Duration :</p>
              </div>
              <p className="font-medium">3 weeks</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="pe-3 text-[20px]"
                />
                <p>Price :</p>
              </div>
              <p className="font-medium">12000$</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon icon={faBook} className="pe-3 text-[20px]" />
                <p>Lessons :</p>
              </div>
              <p className="font-medium">8</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="pe-3 text-[20px]"
                />
                <p>Starts at :</p>
              </div>
              <p className="font-medium">3/16</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="pe-3 text-[20px]"
                />
                <p>Enrolled :</p>
              </div>
              <p className="font-medium">65students</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon
                  icon={faChalkboardUser}
                  className="pe-3 text-[20px]"
                />
                <p>Instructor :</p>
              </div>
              <p className="font-medium">Dr. Ali shahin</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon icon={faGlobe} className="pe-3 text-[20px]" />
                <p>Language :</p>
              </div>
              <p className="font-medium">English</p>
            </div>
            <div className="flex justify-between items-center border-b py-4 border-gray-300">
              <div className="flex justify-between items-center">
                <FontAwesomeIcon
                  icon={faSheetPlastic}
                  className="pe-3 text-[20px]"
                />
                <p>assignment :</p>
              </div>
              <p className="font-medium">4</p>
            </div>
          </div>
        </section>

        <section className="w-full mt-5">
          <h2 className={`${fontClasses.spartan} font-medium text-[30px] py-5`}>
            Comments
          </h2>
          <div>
            <div className="w-full flex justify-between items-start gap-5 py-10">
              <figure className="flex-shrink-0">
                <Image
                  src={user_1}
                  alt="user picture"
                  className="w-[100px] h-[100px] rounded-full me-5 flex-shrink-0"
                  loading="lazy"
                />
              </figure>
              <figcaption className="flex justify-between items-start gap-4 flex-col">
                <h4
                  className={`text-[20px] text-gray-500 font-medium ${fontClasses.spartan}`}
                >
                  Student Name Goes Here
                </h4>
                <p className="text-gray-400">Oct 10, 2021</p>
                <p className={"font-[var(--font-inter)] text-gray-500"}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit rerum vel accusamus sint consectetur laborum natus,
                  blanditiis error debitis iure!
                </p>
              </figcaption>
            </div>
            <hr className="text-gray-300" />
            <div className="w-full flex justify-between items-start gap-5 py-10">
              <figure className="flex-shrink-0">
                <Image
                  src={user_2}
                  alt="user picture"
                  className="w-[100px] h-[100px] rounded-full me-5 "
                  loading="lazy"
                />
              </figure>
              <figcaption className="flex justify-between items-start gap-4 flex-col">
                <h4
                  className={`text-[20px] text-gray-500 font-medium ${fontClasses.spartan} `}
                >
                  Student Name Goes Here
                </h4>
                <p className="text-gray-400">Oct 15, 2021</p>
                <p className="font-[var(--font-inter)] text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit rerum vel accusamus sint consectetur laborum natus,
                  blanditiis error debitis iure!
                </p>
              </figcaption>
            </div>
            <hr className="text-gray-300" />
            <div className="w-full flex justify-between items-start gap-5 py-10">
              <figure className="flex-shrink-0">
                <Image
                  src={user_3}
                  alt="user picture"
                  className="w-[100px] h-[100px] rounded-full me-5 "
                  loading="lazy"
                />
              </figure>
              <figcaption className="flex justify-between items-start gap-4 flex-col">
                <h4
                  className={`text-[20px] text-gray-500 font-medium ${fontClasses.spartan}`}
                >
                  Student Name Goes Here
                </h4>
                <p className="text-gray-400">Oct 19, 2021</p>
                <p className="font-[var(--font-inter)] text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit rerum vel accusamus sint consectetur laborum natus,
                  blanditiis error debitis iure!
                </p>
              </figcaption>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex justify-between flex-col items-start gap-7 pb-14 font-[var(--font-inter)]"
            >
              <textarea
                name="comment"
                title="type you comment here"
                required
                placeholder="Write a comment"
                className="w-full h-[200px] shadow p-5 rounded bg-white"
                value={formData.comment}
                onChange={handleChange}
              ></textarea>
              <button
                className="relative p-5 text-white rounded-md cursor-pointer bg-[#41b69d] overflow-hidden"
                type="submit"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Submit Review <FontAwesomeIcon icon={faArrowRightLong} />
                </span>
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,#358d7e_100%)] opacity-0 transition-opacity duration-500 ease-in-out hover:opacity-100 z-10"></div>
              </button>
            </form>
          </div>
        </section>
      </section>
      <SideSection />
      <OverView />
      <ExamView />
    </main>
  );
}
