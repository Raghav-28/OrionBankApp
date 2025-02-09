import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {

    const loggedIn = {firstName:'Raghav', lastName:'Gupta', email:'graghav286@gmail.com'}

  return (
    <section className="home">
    <div className="home-content">
      <header className="home-header">
        Welcome Raghav
        <HeaderBox 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transactions efficiently."
        />

        <TotalBalanceBox 
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.25}
        />
      </header>

      {/* <RecentTransactions 
        accounts={accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage}
      /> */}
    </div>

    <RightSidebar 
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:123.55},{currentBalance:8542.33}]}
    />
  </section>
  )
}

export default Home
