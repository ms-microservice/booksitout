import React from 'react';

const SummaryTable = ({ statistics }) => {
    return (
        <table class='table table-hover mt-3'>
            <tbody>
                {statistics.map((stat) => {
                    return (
                        <tr>
                            <th className='col-8 h5'>
                                <img
                                    src={stat.icon}
                                    alt=''
                                    className='img-fluid me-3'
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                    }}
                                />
                                {stat.name}
                            </th>
                            <td className='col-4 h5'>{stat.value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default SummaryTable;
