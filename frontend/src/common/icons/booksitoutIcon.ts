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
	BsFillChatLeftTextFill,
	BsFillCalendarFill,
	BsFillPeopleFill,
	BsFire,
	BsFillPostcardFill,
	BsArrowRepeat,
	BsFillInfoCircleFill,
	BsFillFileImageFill,
	BsMapFill,
} from 'react-icons/bs'
import { FaPeopleArrows, FaSearch, FaTheaterMasks, FaUserAlt } from 'react-icons/fa'
import { TbLocationFilled } from 'react-icons/tb'
import { FiLogIn, FiSettings } from 'react-icons/fi'
import { GrCircleQuestion } from 'react-icons/gr'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { ImLibrary } from 'react-icons/im'
import { BiSearchAlt2, BiTime } from 'react-icons/bi'
import { AiFillStar, AiOutlineStar, AiFillCheckCircle, AiOutlineAppstore, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { TbTargetArrow } from 'react-icons/tb'
import { RiFilePaperLine } from 'react-icons/ri'
import { MdBrowserNotSupported, MdLanguage, MdQuiz } from 'react-icons/md';

const booksitoutIcon: { [key: string]: IconType } = {
	login: FiLogIn,
	join: HiOutlineUserAdd,
	question: GrCircleQuestion,
	user: FaUserAlt,

	// settings
	settings: FiSettings,
	paid: BsFillPatchCheckFill,

	// pwa
	pwa: AiOutlineAppstore,
	notSupported: MdBrowserNotSupported,
	info: BsFillInfoCircleFill,

	location: TbLocationFilled,
	map: BsMapFill,

	search: FaSearch,
	topnavSearch: BiSearchAlt2,

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
	category: FaTheaterMasks,

	// Community
	community: BsPeopleFill,
	popular: BsFire,
	post: BsFillPostcardFill,
	quiz: MdQuiz,
	image: BsFillFileImageFill,
	check: AiFillCheckCircle,
	like: AiFillLike,
	dislike: AiFillDislike,

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