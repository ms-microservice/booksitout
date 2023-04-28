insert into memo (content, book_id, page)
    (select concat(content, ' by ', from_who), book_id, page
     from quotation);