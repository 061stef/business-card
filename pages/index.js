import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Layout from '../component/Layout/Layout'
import { ADMIN_BUSINESS_CARD } from '../lib/api'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { slugify } from '../lib/utils'

export async function getServerSideProps({query}) {
  console.log(query);
  const amount = query.amount ? query.amount : null
  const instalments = query.instalments ? query.instalments : null
  return {
    props:{
      amount,
      instalments
    }
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: null
    }
  }

  async componentDidMount() {
    try {

      const response = await fetch(`${ADMIN_BUSINESS_CARD}/profiles`);
      const json = await response.json();
      this.setState({
        profiles: json
      })

    } catch (err) {
      console.error(err);
    }
  }
  render() {

    return (
      <Layout >
        <div className={styles.containerBox}>
          {(this.state.profiles || []).map((profile, index) => (
            <Link href={`/${profile.id}`} passHref={true} key={index}>
              <a href="#">
                <div className={styles.boxBusiness}>
                  {profile.name}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Layout>
    )
  }
}

