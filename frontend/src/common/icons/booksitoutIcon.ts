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
} from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import { TbLocationFilled } from 'react-icons/tb'
import { FiLogIn, FiSettings } from 'react-icons/fi'
import { GrCircleQuestion } from 'react-icons/gr'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { ImLibrary } from 'react-icons/im'
import { BiTime } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { AiFillStar, AiOutlineStar, AiFillCheckCircle } from 'react-icons/ai'
import { TbTargetArrow } from 'react-icons/tb'
import { IoIosPaper } from 'react-icons/io'
import { RiFilePaperLine } from 'react-icons/ri'

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

	community: BsPeopleFill,

	check: AiFillCheckCircle,

	// gathering
	subway: BsTrainFrontFill,
	online: BsWebcamFill,
	others: BsFillQuestionCircleFill,

	// tips
	time: BiTime,

	// library
	library: ImLibrary,
	membership: BsFillPersonVcardFill,
}

export default booksitoutIcon