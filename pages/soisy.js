import React from 'react'

export async function getServerSideProps({ query }) {
    const amount = query.amount ? query.amount : null
    const instalments = query.instalments ? query.instalments : null
    return {
        props: {
            amount,
            instalments
        }
    }
}


export default class Soisy extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{textAlign: 'center', backgroundColor: '#F6F8FA', minHeight: '100vh'}}>
                <script src="https://cdn.soisy.it/loan-quote-widget.js" async defer></script>
                <soisy-loan-quote
                id={'soisy-widget-custom'}
                    shop-id="soisytests"
                    amount={this.props.amount}
                    instalments={this.props.instalments}
                    zero-interest-rate="0"
                ></soisy-loan-quote>
            </div>
        )

    }
}