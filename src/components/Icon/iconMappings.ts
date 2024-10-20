import {
  AiFillWarning,
  AiOutlineAudit,
  AiOutlineEye,
  AiOutlineSafety,
  AiOutlineWarning,
} from 'react-icons/ai';
import {
  BiBell,
  BiCheck,
  BiCustomize,
  BiHide,
  BiLockAlt,
} from 'react-icons/bi';
import {
  BsActivity,
  BsArrowRepeat,
  BsCalendar4,
  BsCodeSlash,
  BsDash,
  BsExclamationCircle,
  BsFillExclamationTriangleFill,
  BsMicrosoftTeams,
  BsQuestionCircleFill,
} from 'react-icons/bs';
import { CiCloud } from 'react-icons/ci';
import { FaCheckCircle, FaGitlab, FaSlack, FaTrademark } from 'react-icons/fa';
import {
  FiAlertOctagon,
  FiArrowLeft,
  FiArrowRight,
  FiCamera,
  FiClock,
  FiCreditCard,
  FiDatabase,
  FiDownload,
  FiEdit3,
  FiExternalLink,
  FiFolderPlus,
  FiHome,
  FiMoreVertical,
  FiPlusCircle,
  FiSave,
  FiServer,
  FiTrash2,
  FiUpload,
  FiUploadCloud,
  FiUser,
  FiX,
  FiXCircle,
} from 'react-icons/fi';
import { HiPlus, HiUserGroup } from 'react-icons/hi';
import { HiOutlineArrowLongDown, HiOutlineArrowLongUp } from 'react-icons/hi2';
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoIosMailOpen,
  IoMdArrowDropup,
  IoMdClose,
} from 'react-icons/io';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import {
  MdAccessTimeFilled,
  MdArrowBack,
  MdArrowForwardIos,
  MdContentCopy,
  MdDoneAll,
  MdOfflineBolt,
} from 'react-icons/md';
import { PiMedal } from 'react-icons/pi';
import {
  RiErrorWarningLine,
  RiKey2Line,
  RiTrademarkLine,
} from 'react-icons/ri';
import { RxCopy, RxDotFilled, RxFile } from 'react-icons/rx';
import {
  SiBitbucket,
  SiGit,
  SiGithub,
  SiHelm,
  SiMicrosoftteams,
} from 'react-icons/si';

export type IconMappingKeys = keyof typeof iconMapping;

const iconMapping = {
  arrowForward: MdArrowForwardIos,
  circleCheck: IoIosCheckmarkCircle,
  circleCross: IoIosCloseCircle,
  snap: RxCopy,
  timeFilled: MdAccessTimeFilled,
  copy: MdContentCopy,
  fileAttached: IoDocumentAttachOutline,
  calendar: BsCalendar4,
  exclamationTriangle: BsFillExclamationTriangleFill,
  exclamationCircle: BsExclamationCircle,
  questionCircle: BsQuestionCircleFill,
  plus: HiPlus,
  plusCircle: FiPlusCircle,
  folderPlus: FiFolderPlus,
  edit: FiEdit3,
  trash: FiTrash2,
  arrowRight: FiArrowRight,
  arrowLeft: FiArrowLeft,
  arrowDown: HiOutlineArrowLongDown,
  arrowUp: HiOutlineArrowLongUp,
  XCircle: FiXCircle,
  close: IoMdClose,
  arrowBackward: MdArrowBack,
  git: SiGit,
  gitHub: SiGithub,
  gitLab: FaGitlab,
  bitbucket: SiBitbucket,
  custom: BiCustomize,
  helm: SiHelm,
  threeVerticalDots: FiMoreVertical,
  uploadCloud: FiUploadCloud,
  server: FiServer,
  creditCard: FiCreditCard,
  save: FiSave,
  db: FiDatabase,
  home: FiHome,
  camera: FiCamera,
  clock: FiClock,
  msTeams: SiMicrosoftteams,
  msTeamsDark: BsMicrosoftTeams,
  slack: FaSlack,
  lock: BiLockAlt,
  key: RiKey2Line,
  codeSlash: BsCodeSlash,
  dash: BsDash,
  bell: BiBell,
  download: FiDownload,
  check: BiCheck,
  dot: RxDotFilled,
  cross: FiX,
  dropupArrow: IoMdArrowDropup,
  arrowRepeat: BsArrowRepeat,
  checkCircle: FaCheckCircle,
  offlineBolt: MdOfflineBolt,
  mailOpen: IoIosMailOpen,
  safety: AiOutlineSafety,
  warning: AiOutlineWarning,
  info: RiErrorWarningLine,
  user: FiUser,
  hide: BiHide,
  eyeOpen: AiOutlineEye,
  userGroup: HiUserGroup,
  fillWarning: AiFillWarning,
  audit: AiOutlineAudit,
  tradeMark: RiTrademarkLine,
  warningOctagon: FiAlertOctagon,
  externalLink: FiExternalLink,
  upload: FiUpload,
  file: RxFile,
  tradeMarkDark: FaTrademark,
  medal: PiMedal,
  done: MdDoneAll,
  cloud: CiCloud,
  activity: BsActivity,
} as const;

export const getIcon = (iconValue: IconMappingKeys) => {
  if (!iconMapping[iconValue]) {
    throw new Error(
      `Icon name '${iconValue}' is not mapped, please follow steps to add it to mapping mentioned in file iconMappings.ts`,
    );
  }
  return iconMapping[iconValue];
};
