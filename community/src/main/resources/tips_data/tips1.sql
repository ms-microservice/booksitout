insert into tips (title, summary, content, type, estimated_read_time, created_date, last_modified_date)
values ('책잇아웃, 앱으로 사용하기',
        '책잇아웃은 웹사이트지만, 스마트폰 홈 화면에 추가해서 마치 앱처럼 사용할 수 있어요',
        REPLACE('
<div className="mb-5">
<h2 className="text-center mt-4">iOS (아이폰)</h2>
<p className="text-center text-secondary">아이폰의 경우 아래 절차를 따라 추가할 수 있어요</p>
<div className="row mt-5 mb-5">
<div className="col-12">
<img src="https://user-images.githubusercontent.com/61900235/236503131-f2d1a875-c201-4c5f-a135-8aa02281dc9b.png" className="img-fluid w-100 rounded"/>
</div>
</div>
<hr/>
<h2 className="text-center mt-5">안드로이드 (삼성, LG 등)</h2>
<p className="text-center text-secondary">안드로이드는 아래 버튼을 눌러 추가할 수 있어요</p>
<div className="row justify-content-center mt-5 mb-5">
<div className="col-12 col-md-6">
<button className="btn btn-book w-100 disabled">안드로이드에 책잇아웃 추가하기</button>
</div>
</div>
<hr/>
<h2 className="text-center mt-5 mb-4">참고</h2>
<p className="text-center text-secondary">이 기능은 앱처럼 보이지만 앱이 아니기 때문에 일부 기능에 제약이 있을 수 있어요</p>
<p className="text-center text-secondary">이 기능은 PWA라는 기술을 사용하고 있어요</p>
</div>
', '  ', ''),

        'NATIVE', 2,
        NOW(), NOW());