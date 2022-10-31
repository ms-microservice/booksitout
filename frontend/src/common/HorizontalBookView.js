import React from 'react';
import { Card } from 'react-bootstrap';

const HorizontalBookView = ({ book }) => {
    return (
        <div className='row mt-3 row-eq-height'>
            <div className='col-4 align-self-center'>
                <img
                    src={book.image}
                    alt=''
                    className='img-fluid rounded border'
                />
            </div>

            <div className='col-8'>
                <h4>{book.title}</h4>
                <h6 className='text-muted'>{book.author}</h6>

                <div className='row align-items-center'>
                    <div className='col-9'>
                        <div className='progress mt-3 mb-3'>
                            <div
                                className='progress-bar'
                                role='progressbar'
                                style={{
                                    width:
                                        (book.currentPage / book.endPage) *
                                            100 +
                                        '%',
                                }}
                                aria-valuenow={book.currentPage}
                                aria-valuemin={0}
                                aria-valuemax={book.endPage}
                            ></div>
                        </div>
                    </div>
                    <div className='col-3 align-middle'>
                        <span className='align-middle'>
                            {`${book.currentPage} / ${book.endPage}`}
                        </span>
                    </div>
                </div>

                <div className='row text-center mt-4 justify-content-center'>
                    <div className='col-3'>
                        <img
                            src={book.language.image}
                            alt=''
                            className='img-fluid'
                            style={{
                                width: '50px',
                                height: '50px',
                            }}
                        />
                        <h6 className='text-center mt-2'>
                            {book.language.name}
                        </h6>
                    </div>
                    <div className='col-4'>
                        <img
                            src={book.category.image}
                            alt=''
                            className='img-fluid'
                            style={{
                                width: '50px',
                                height: '50px',
                            }}
                        />
                        <h6 className='text-center mt-2'>
                            {book.category.name}
                        </h6>
                    </div>
                    <div className='col-4'>
                        <img
                            src={book.medium.image}
                            alt=''
                            className='img-fluid'
                            style={{
                                width: '50px',
                                height: '50px',
                            }}
                        />
                        <h6 className='text-center mt-2'>{book.medium.name}</h6>
                    </div>
                </div>

                <div className='row mt-md-5'>
                    <div className='col-6'>
                        <div className='btn btn-primary w-100'>이어서 읽기</div>
                    </div>
                    <div className='col-6'>
                        <div className='btn btn-warning w-100'>
                            다른 책 읽기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalBookView;
