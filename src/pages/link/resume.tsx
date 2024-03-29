import Image from 'next/image';
import Link from 'next/link';
import resumeThumb from '../../../public/images/thumb_resume.webp';
import atsResumeThumb from '../../../public/images/thumb_resume_ats.webp';
import { captureClick } from '../../lib/rtools';
import { ResumeInfoType } from '../../types';

const resumeInfo: ResumeInfoType = {
  title: 'Current Resume',
  name: 'resume_download',
  link: '/static/rpdaley_resume_2023.pdf',
  img: resumeThumb,
};
const atsResumeInfo = {
  title: 'ATS Resume',
  name: 'ats_resume_download',
  link: '/static/ats_rpdaley_resume_2023.pdf',
  img: atsResumeThumb,
};

const ResumeBlock = ({ title, name, link, img }: ResumeInfoType) => (
  <Link
    href={link}
    title={title}
    target="_blank"
    onClick={() => {
      captureClick({ name, link });
    }}
    rel="noreferrer"
    className="py-2"
  >
    <div className="mx-auto w-3/4 px-5 py-1 hover:scale-105">
      <div className="text-2xl font-oswald">{title}:</div>
      <Image src={img} width={600} height={776} alt={`Link to ${title}`} />
    </div>
  </Link>
);

export default function Resume() {
  return (
    <div className="mx-auto w-3/4 grid grid-cols-1 divide-y-2 divide-slate-500">
      <div className="text-3xl md:text-5xl font-oswald">Resumes:</div>
      <ResumeBlock {...resumeInfo} />
      <ResumeBlock {...atsResumeInfo} />
    </div>
  );
}
