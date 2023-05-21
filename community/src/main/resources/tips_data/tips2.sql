insert into tips (title, summary, content, type, estimated_read_time, created_date, last_modified_date)
values ('책을 읽었지만 측정을 깜빡했다면?',
        '책잇아웃으로 딱 1번만 기록하면 페이지를 바탕으로 시간을 예측해 줘서 매번 측정할 필요가 없어요',
        REPLACE('
<div className="mb-5 text-center lead">
        <div>책잇아웃으로 독서활동을 측정하면 통계도 보여주고 나중에 독서활동을 되돌아 볼 수 있어서 좋지만, 매번 측정해는게 부담스러울 수 있어요.</div>
        <br/>
        <div>그럴때는 책잇아웃의 독서시간 예측 기능을 사용해 처음 1번만 측정하고 그 후로는 페이지만으로 독서활동을 추가할 수 있어요.</div>

        <div class="mt-5"/>
        <h3 class="mb-3">1. 먼저, 한 번이라도 독서활동을 직접 측정해 주세요</h3>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/42cbffe1-c83c-48c9-af20-393638a108da" className="img-fluid w-100 rounded border"/>
                </div>
        </div>

        <div class="mt-5"/>

        <h3 class="mb-3">2. 오른쪽 위의 초록색의 추가버튼을 누르면 독서활동을 직접 추가할 수 있는 창이 나와요</h3>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/066c1103-e606-4ef0-a6a0-b94aec8af99e" className="img-fluid w-100 rounded border"/>
                </div>
        </div>

        <div class="mt-5"/>
        <h3 class="mb-3">3. 현재 페이지로 예측하기 버튼이 비활성화 돼 있어요. 읽고 있는 페이지를 입력해 주세요</h3>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/17a4ee1a-5a96-4d23-944d-c86c614976d3" className="img-fluid w-100 rounded border"/>
                </div>
        </div>


        <div class="mt-5"/>
        <h3 class="mb-3">4. 페이지를 입력하면 버튼이 활성화되요. "페이지로 예측하기"를 눌러주세요</h3>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/8c48a073-5a83-46f6-9f56-3a88de452327" className="img-fluid w-100 rounded border"/>
                </div>
        </div>

        <div class="mt-5"/>
        <hr/>

        <h2 className="text-center mt-5 mb-4">참고</h2>
        <p className="text-center text-secondary">이 전 독서활동을 바탕으로 예측하기 때문에 정확하지 않을 수 있어요</p>
        <p className="text-center text-secondary">직접 측정하는 독서활동이 많을 수록 정확도가 올라가요</p>
</div>', '  ', ''),

        'NATIVE', 4,
        CURDATE(), CURDATE()
       );

update tips
set content = REPLACE('
<div className="mb-5 text-center lead">
        <div>책잇아웃으로 독서활동을 측정하면 통계도 보여주고 나중에 독서활동을 되돌아 볼 수 있어서 좋지만, 매번 측정해는게 부담스러울 수 있어요.</div>
        <br/>
        <div>그럴때는 책잇아웃의 독서시간 예측 기능을 사용해 처음 1번만 측정하고 그 후로는 페이지만으로 독서활동을 추가할 수 있어요.</div>

        <div class="mt-5"/>
        <h4 class="mb-3"><span class="text-book">(1)</span> 먼저, 한 번이라도 독서활동을 직접 측정해 주세요</h4>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/42cbffe1-c83c-48c9-af20-393638a108da" className="img-fluid w-100 rounded border"/>
                </div>
        </div>

        <div class="mt-5"/>

        <h4 class="mb-3"><span class="text-book">(2)</span> 오른쪽 위의 초록색의 추가버튼을 누르면 독서활동을 직접 추가할 수 있는 창이 나와요</h4>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/066c1103-e606-4ef0-a6a0-b94aec8af99e" className="img-fluid w-100 rounded border"/>
                </div>
        </div>

        <div class="mt-5"/>
        <h4 class="mb-3"><span class="text-book">(3)</span> 현재 페이지로 예측하기 버튼이 비활성화 돼 있어요. 읽고 있는 페이지를 입력해 주세요</h4>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/17a4ee1a-5a96-4d23-944d-c86c614976d3" className="img-fluid w-100 rounded border"/>
                </div>
        </div>


        <div class="mt-5"/>
        <h4 class="mb-3"><span class="text-book">(4)</span> 페이지를 입력하면 버튼이 활성화되요. "페이지로 예측하기"를 눌러주세요</h4>
        <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-xl-4">
                        <img src="https://github.com/jinkyumpark/booksitout/assets/61900235/8c48a073-5a83-46f6-9f56-3a88de452327" className="img-fluid w-100 rounded border"/>
                </div>
        </div>

        <div class="mt-5"/>
        <hr/>

        <h2 className="text-center mt-5 mb-4">참고</h2>
        <p className="text-center text-secondary">이 전 독서활동을 바탕으로 예측하기 때문에 정확하지 않을 수 있어요</p>
        <p className="text-center text-secondary">직접 측정하는 독서활동이 많을 수록 정확도가 올라가요</p>
</div>', '  ', '')
where tips_id=13;