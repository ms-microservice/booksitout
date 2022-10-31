import React from 'react';
import { Card, Container } from 'react-bootstrap';
// Icon
import koreaIcon from '../images/language/korea.png';
import novelIcon from '../images/category/novel.png';
import ebookIcon from '../images/medium/ebook.png';
import timeIcon from '../images/statistics/time.png';
import bookIcon from '../images/statistics/book.png';
import averageIcon from '../images/statistics/average.png';
import starIcon from '../images/statistics/star.png';
import longestDayIcon from '../images/statistics/bookworm.png';
import pageIcon from '../images/statistics/page.png';
import goalIcon from '../images/general/goal.png';
// Components
import HorizontalBookView from '../common/HorizontalBookView';
import DateLineChart from '../statistics/DateLineChart';
import SummaryTable from '../statistics/SummaryTable';

const Main = () => {
    const dummy = {
        lastBook: {
            title: '위대한 게츠비',
            author: 'F. 스콧 피츠제럴드',
            image: 'http://minumsa.minumsa.com/wp-content/uploads/bookcover/075_위대한개츠비-300x511.jpg',
            startDate: '',
            currentPage: 100,
            endPage: 400,
            language: {
                name: '한국어',
                image: koreaIcon,
            },
            category: {
                name: '소설',
                image: novelIcon,
            },
            medium: {
                name: '이북',
                image: ebookIcon,
            },
        },
        statistics: [
            {
                id: 1,
                icon: timeIcon,
                name: '총 독서시간',
                value: '201시간',
            },
            {
                id: 3,
                icon: averageIcon,
                name: '하루 평균 독서시간',
                value: '1시간 12분',
            },
            {
                id: 2,
                icon: bookIcon,
                name: '읽은 책',
                value: '66권',
            },
            {
                id: 4,
                icon: starIcon,
                name: '평균별점',
                value: '3.4권',
            },
            {
                id: 2,
                icon: longestDayIcon,
                name: '책을 가장 많이 읽은 날',
                value: '450분',
            },
            {
                id: 2,
                icon: pageIcon,
                name: '총 읽은 페이지 수',
                value: '5043 페이지',
            },
        ],
        goal: {
            current: 12,
            goal: 50,
        },
    };

    return (
        <Container>
            <div className='row row-eq-height'>
                <div className='col-lg-12 col-xl-6 mb-4'>
                    <Card className='mb-4 h-100'>
                        <Card.Body>
                            <h3>마지막으로 읽은 책</h3>

                            <HorizontalBookView book={dummy.lastBook} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-lg-12 col-xl-6 mb-4'>
                    <Card className='h-100'>
                        <Card.Body>
                            <h3>최근 2주간 독서시간</h3>

                            <DateLineChart
                                startDate={new Date().setDate(Date.now() - 14)}
                                data={[
                                    ...Array.from(
                                        { length: 14 },
                                        (_, i) => Math.random() * 250
                                    ),
                                ]}
                            />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-lg-12 col-xl-6 mb-4'>
                    <Card className='h-100'>
                        <Card.Body>
                            <h3>2022년 목표</h3>

                            <Goal goal={dummy.goal} />
                        </Card.Body>
                    </Card>
                </div>

                <div className='col-lg-12 col-xl-6 mb-4'>
                    <Card className='h-100'>
                        <Card.Body>
                            <h3>2022년 독서 요약</h3>

                            <SummaryTable statistics={dummy.statistics} />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

const Goal = ({ goal }) => {
    return (
        <div className='row text-center' style={{ height: '80%' }}>
            <div className='col-6 align-self-center'>
                <img
                    src={goalIcon}
                    alt=''
                    className='img-fluid align-middle'
                    style={{
                        width: '150px',
                        height: '150px',
                    }}
                />
            </div>

            <div className='col-6 align-self-center'>
                <h1>
                    {goal.current}권 / {goal.goal}권
                </h1>
            </div>
        </div>
    );
};

export default Main;
