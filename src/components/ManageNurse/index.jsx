import React from 'react'
import TotalnurseDashboard from './TotalnurseDashboard';
import NurseHistoryTable from './NurseHistoryTable';

export default class ManageNurse extends React.Component {
    state = {
        nurseHistory: false
    }

    // call back to TotalnurseDashboard -> TotalnureseTable
    getNurseHistory = (id) => {
        this.setState({
            nurseId: id,
            nurseHistory: true
        })
    }
    backToNurseTable = () => {
        this.setState({
            nurseHistory: false
        })
    }
    render() {
        return (
            <>
                {

                    this.state.nurseHistory === false ?
                        <TotalnurseDashboard
                            getNurseHistory={(id) => this.getNurseHistory(id)}
                        />
                        :
                        <NurseHistoryTable nurseId={this.state.nurseId} backToNurseTable={() =>this.backToNurseTable()} />
                }
            </>
        )
    }
}