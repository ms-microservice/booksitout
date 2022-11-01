import React from 'react';
import { Card, Container } from 'react-bootstrap';
// Icon
import goalIcon from '../images/general/goal.png';
import { dummy } from '../dummy.js';
// Components
import HorizontalBookView from '../common/HorizontalBookView';
import DateLineChart from '../statistics/DateLineChart';
import SummaryTable from '../statistics/SummaryTable';

const Main = () => {
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
