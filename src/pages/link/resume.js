import Image from "next/image";
import Link from "next/link";
import resumeThumb from "../../../public/images/thumb_resume.webp";
import atsResumeThumb from "../../../public/images/thumb_resume_ats.webp";
import { captureClick } from "../../lib/rtools";

export default function Resume() {
  const resumeClickInfo = {
    name: "resume_download",
    link: "/static/rpdaley_resume_2023.pdf",
  };
  const atsClickInfo = {
    name: "ats_resume_download",
    link: "/static/ats_rpdaley_resume_2023.pdf",
  };
  return (
    <div className="mx-auto w-3/4 grid grid-cols-1 divide-y-2 divide-slate-500">
      <div className="text-2xl">Resumes:</div>

      <Link
        href={resumeClickInfo.link}
        alt="Current Resume"
        target="_blank"
        onClick={() => {
          captureClick(resumeClickInfo);
        }}
        rel="noreferrer"
        className="py-2"
      >
        <div className="mx-auto w-3/4 px-5 py-1 hover:scale-105">
          <div className="text-lg">Current resume:</div>
          <Image
            src={resumeThumb.src}
            width={600}
            height={776}
            alt="Link to Current Resume"
          />
        </div>
      </Link>
      <Link
        href={atsClickInfo.link}
        alt="Current Resume"
        target="_blank"
        onClick={() => {
          captureClick(atsClickInfo);
        }}
        rel="noreferrer"
        className="py-2"
      >
        <div className="mx-auto w-3/4 px-5 py-1 hover:scale-105">
          <div className="text-lg">ATS resume:</div>
          <Image
            src={atsResumeThumb.src}
            width={600}
            height={776}
            alt="Link to ATS Resume"
          />
        </div>
      </Link>
    </div>
  );
}
