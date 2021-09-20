import React from "react";
import Layout from "../component/Layout/Layout";
import styles from '../styles/slug.module.css';
import { FaDownload, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhone, } from "react-icons/fa";
import { ADMIN_BUSINESS_CARD } from "../lib/api";
import { slugify } from "../lib/utils";



export async function getServerSideProps({ params }) {
    const slug = params.slug
    return {
        props: {
            slug
        }
    }
}

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        }
    }

    async componentDidMount() {
        console.log(this.props.slug);
        try {
            const response = await fetch(`${ADMIN_BUSINESS_CARD}/profiles`);
            console.log(response);
            if (response.status < 400) {
                const json = await response.json();
                const profile = (json || []).find(item => this.props.slug === slugify(item.name));
                this.setState({
                    profile: profile ? profile : null
                })
            }

        } catch (e) {
            console.error(e);
        }
    }
    render() {
        return (
            <Layout title={this.props.slug} description={''}>
                {this.state.profile ? <div className={styles.wrapper}>
                    <div className={styles.card}>
                        <div className={styles.cardUp}>
                            <img src="" alt="next" className={styles.logo} />
                            <h1 className={styles.name}>
                                {this.state.profile.name}
                            </h1>
                            <p className={styles.role}>
                                {this.state.profile.role}
                            </p>
                            <div className={styles.hr}></div>
                            <div className={styles.list}>
                                <a href={`tel:${this.state.profile.phone}`}>
                                    <div className={styles.box}>
                                        <FaPhone size={'20px'} />
                                    </div>
                                </a>
                                <a href={this.state.profile.link_drive}>
                                    <div className={styles.box}>
                                        <FaDownload size={'20px'} />
                                    </div>
                                </a>
                                <a href={`mailto:${this.state.email}`}>
                                    <div className={styles.box}>
                                        <FaEnvelope size={'20px'} />
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className={styles.cardDown}>
                            <h2 className={styles.name} style={{ color: '#fff' }}>Next ADV</h2>
                            <div className={styles.listSociety}>
                                <a href={'tel:123123123123'}>
                                    <div className={styles.info}>
                                        <FaPhone size={'20px'}/>
                                    </div>
                                </a>
                                <a href={'mailto:a@a.com'}>
                                    <div className={styles.info}>
                                        <FaEnvelope size={'20px'} />
                                    </div>
                                </a>
                                <a href={'https://www.nextadv.it/'} target="_blank" rel="www.nextadv.it">
                                    <div className={styles.info}>
                                        <FaGlobe size={'20px'} />
                                    </div>
                                </a>
                                <a href="https://www.google.com/maps/place/Via+dei+Granai+di+Nerva,+48,+00142+Roma+RM/data=!4m2!3m1!1s0x13258a49d828da85:0x352a0991b27c0acb?sa=X&ved=2ahUKEwiRi_yypI3zAhVB3KQKHX_rAdkQ8gF6BAgLEAE" target="_blank" >
                                    <div className={styles.info}>
                                        <FaMapMarkerAlt size={'20px'} />
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>
                </div> : null}


            </Layout>
        );
    }
}