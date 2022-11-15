import React from 'react';
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const EMAIL_MESSAGE = 'ID로 사용하실 이메일을 입력해 주세요';
    const PASSWORD_MESSAGE = '비밀번호를 입력해 주세요';

    const handleJoin = (e) => {
        e.preventDefault();

        fetch('http://localhost/v1/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                alert(data.message);

                if (data.status.toString().startsWith(2)) {
                    navigate('/login');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='mt-5 container'>
            <div className='row justify-content-center'>
                <Card className='col-12 col-lg-6 text-center'>
                    <Card.Body>
                        <h1>📗 회원가입</h1>

                        <form onSubmit={handleJoin}>
                            <div class='form-group row mt-3'>
                                <label
                                    for='email'
                                    class='col-sm-2 col-form-label text-start'
                                >
                                    이메일
                                </label>
                                <div class='col-sm-10'>
                                    <input
                                        type='email'
                                        class='form-control'
                                        placeholder={EMAIL_MESSAGE}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div class='form-group row mt-3'>
                                <label
                                    for='inputPassword3'
                                    class='col-sm-2 col-form-labe text-start'
                                >
                                    비밀번호
                                </label>
                                <div class='col-sm-10'>
                                    <input
                                        type='password'
                                        class='form-control'
                                        placeholder={PASSWORD_MESSAGE}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='row justify-content-center mt-3'>
                                <div className='col-4'>
                                    <button
                                        type='submit'
                                        className='btn btn-primary w-100'
                                    >
                                        회원가입
                                    </button>
                                </div>
                                <div className='col-4'>
                                    <a
                                        className='btn btn-success w-100'
                                        href='login'
                                    >
                                        로그인
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Join;
