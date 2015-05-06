'use strict';

const React = require('react');
const { Row, Col, Table } = require('react-bootstrap');
const { ButtonToolbar, ButtonGroup, Button } = require('react-bootstrap');
const { FaIcon } = require('react-fa-icon');

class Setup extends React.Component {
    render() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th> Side</th>
                    <th> Role</th>
                    <th> Count</th>
                    <th> Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td> <FaIcon icon="moon-o"/> </td>
                    <td> Werewolf </td>
                    <td> 3 </td>
                    <td>
                        <ButtonGroup>
                            <Button bsSize="xsmall"><FaIcon icon="plus"/></Button>
                            <Button bsSize="xsmall"><FaIcon icon="minus"/></Button>
                        </ButtonGroup>
                    </td>
                </tr>
                </tbody>
            </Table>
        );
    }
}

module.exports = Setup;
