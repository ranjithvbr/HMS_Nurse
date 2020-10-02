import React from 'react';
import CustomerHistoryTable from './CustomerHistoryTable';
import NurseCustomerHistoryTable from './NurseCustomerHistoryTable';

export default class CustomerHistoryMaster extends React.Component {
    state = {
        customerHistory: false
    }

    // call back func to CustomerHistoryTable
    DetailedCustomerHistory = (id) => {
        this.setState({
            customerId: id,
            customerHistory: true
        })
    }
    backToFirstTable = () => {
        this.setState({
            customerHistory: false
        })
    }
    render() {
        return (
            <>
                {

                    this.state.customerHistory === false ?
                        <CustomerHistoryTable check="fjk" DetailedCustomerHistory={(id) => this.DetailedCustomerHistory(id)}/>
                        :
                        <NurseCustomerHistoryTable customerId={this.state.customerId} backToFirstTable={() => this.backToFirstTable()} />
                }
            </>
        )
    }
}