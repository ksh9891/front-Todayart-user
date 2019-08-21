import React from 'react';

const FreeBoard = () => {
  return (
    <div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
        <tr>
            <td>1</td>
            <th><a href="freeboard/${article_id}">제목입니다</a></th>
            <th>작성자에요</th>
            <th>날짜라고</th>
            <th>조회수다다다다</th>
          </tr>
          <tr>
            <td>2</td>
            <th>제목입니다2</th>
            <th>작성자에요2</th>
            <th>날짜라고2</th>
            <th>조회수다다다다2</th>
          </tr>
          <tr>
            <td>3</td>
            <th>제목입니다3</th>
            <th>작성자에요3</th>
            <th>날짜라고3</th>
            <th>조회수다다다다3</th>
          </tr>
        </tbody>
      </table>

      <hr />
      <a class="btn btn-default pull-right"> 글쓰기</a>

      <div class="text-center">
        <ul class="pagination"></ul>
      </div>

      <thead class="bg_f_f9">
        <tr>
          <th scope="col" class="no"><span><a href="" title="내림차순 정렬">번호</a></span></th>
          <th scope="col" class="m_no"><span>카테고리</span></th>
          <th scope="col" class="title"><span><a href="">제목</a></span></th>
          <th scope="col"><span>글쓴이</span></th>
          <th scope="col"><span><a href="">날짜</a></span></th>
          <th scope="col" class="m_no"><span><a href="">조회</a></span></th>
        </tr>
      </thead>

      <tr>
        <td class="no">119943</td>
        <td class="cate"><span><b>일반</b></span></td>
        <td class="title">
          <a href="/kboard/14930625" class="hx" >
            DB에서 불러온 제목
              </a>
          <a href="/kboard/14930625#14930625_comment" class="replyNum" title="댓글">1</a>
        </td>
        <td class="author">
          <span>
            <a href="#popup_menu_area" class="member_14869305" onclick="return false">
              DB에서 불러온 글쓴이
                    </a>
          </span>
        </td>
        <td class="time" title="9 분 전">08.19</td>
        <td class="m_no">15</td>
      </tr>
    </div>
  )
};

export default FreeBoard;