import { Col, Row } from 'react-bootstrap';

// hooks
import { usePageTitle } from '../../../hooks';

// component
import Projects from './Projects';

// dummy data
import { projectDetails } from './data';

const Vehicles = () => {
    // set pagetitle
    usePageTitle({
        title: 'Vehicles',
        breadCrumbItems: [
            {
                path: '/vehicles',
                label: 'Vehicles',
                active: true,
            },
        ],
    });

    return (
        <>
            {/* <Statistics /> */}

            <Row>
                {/* <Col xl={4}>
                    <Inbox messages={messages} />
                </Col> */}
                <Col xl={12}>
                    <Projects projectDetails={projectDetails} />
                </Col>
                <Col xl={4}>
                    {/* <RevenueChart /> */}
                </Col>
            </Row>

            {/* <Row>
                <Col xl={4}>
                    <SalesChart />
                </Col>
                <Col xl={4}>
                    <StatisticsChart />
                </Col>
                
            </Row> */}

            {/* <Users /> */}

            
        </>
    );
};

export default Vehicles;
