import { IconType } from 'react-icons';

import {
	BsFillPersonVcardFill,
	BsPeopleFill,
	BsFileEarmarkBarGraphFill,
	BsBookHalf,
	BsTrainFrontFill,
	BsWebcamFill,
	BsFillQuestionCircleFill,
	BsFillPatchCheckFill,
	BsPencilFill,
	BsPersonFill,
	BsFillChatLeftTextFill,
	BsFillCalendarFill,
	BsFillPeopleFill,
	BsFire,
	BsFillPostcardFill,
	BsArrowRepeat
} from 'react-icons/bs'
import { FaPeopleArrows, FaSearch } from 'react-icons/fa'
import { TbLocationFilled } from 'react-icons/tb'
import { FiLogIn, FiSettings } from 'react-icons/fi'
import { GrCircleQuestion, GrLanguage } from 'react-icons/gr'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { ImLibrary } from 'react-icons/im'
import { BiTime } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillStar, AiOutlineStar, AiFillCheckCircle } from 'react-icons/ai'
import { TbTargetArrow } from 'react-icons/tb'
import { IoIosPaper } from 'react-icons/io'
import { RiFilePaperLine } from 'react-icons/ri'
import { MdLanguage, MdOutlineLanguage } from 'react-icons/md';

const booksitoutIcon: { [key: string]: IconType } = {
	login: FiLogIn,
	join: HiOutlineUserAdd,
	question: GrCircleQuestion,
	user: FaUserAlt,

	// settings
	settings: FiSettings,
	paid: BsFillPatchCheckFill,

	location: TbLocationFilled,

	search: FaSearch,

	book: BsBookHalf,
	title: BsPencilFill,
	author: BsFillPeopleFill,
	description: BsFillChatLeftTextFill,
	publishYear: BsFillCalendarFill,
	page: RiFilePaperLine,

	// Statistics
	statistics: BsFileEarmarkBarGraphFill,
	star: AiOutlineStar,
	starFill: AiFillStar,
	goal: TbTargetArrow,
	language: MdLanguage,

	// Community
	community: BsPeopleFill,
	popular: BsFire,
	post: BsFillPostcardFill,

	check: AiFillCheckCircle,

	// gathering
	gathering: FaPeopleArrows,
	subway: BsTrainFrontFill,
	online: BsWebcamFill,
	others: BsFillQuestionCircleFill,

	// tips
	time: BiTime,

	// library
	library: ImLibrary,
	membership: BsFillPersonVcardFill,

	// admin
	qna: BsFillQuestionCircleFill,
	faq: BsArrowRepeat,
}

export default booksitoutIcon