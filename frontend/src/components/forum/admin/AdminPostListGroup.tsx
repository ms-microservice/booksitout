import { ListGroup } from 'react-bootstrap'

import NoContent from '../../common/NoContent'
import Error from '../../common/Error'

const AdminPostListGroup = ({postList}) => {

    if (postList == null) return <Error/>
    if (postList.length === 0) return <NoContent message='아직 꿀팁이 없어요' useImage={false} mb='75px' />

    return <ListGroup></ListGroup>
}

export default AdminPostListGroup