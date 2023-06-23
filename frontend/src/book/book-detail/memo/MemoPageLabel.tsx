import React from 'react'
import styled from 'styled-components';

const MemoPageLabel = ({ memo }) => {
	return (
		<MemoLabelContainer>
			{memo.page !== 0 && memo.page != null && <b className="text-bold text-book">{memo.page}P</b>}
		</MemoLabelContainer>
	)
}

const MemoLabelContainer = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px
`;

export default MemoPageLabel