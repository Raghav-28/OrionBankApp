import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react';

interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  };
}

const Home = async ({ searchParams }: SearchParamProps) => {
  // Destructure searchParams after ensuring it's available
  const { id, page } = searchParams;
  const currentPage = Number(page as string) || 1;
  // Fetch logged-in user
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) {
    return <div>User not logged in</div>;
  }

  // Fetch user accounts
  const accounts = await getAccounts({ userId: loggedIn.$id });
  if (!accounts || !accounts.data) {
    return <div>No accounts found</div>;
  }

  const accountsData = accounts.data;

  // Ensure appwriteItemId is valid
  const appwriteItemId = (id as string) || (accountsData.length > 0 ? accountsData[0].appwriteItemId : null);
  if (!appwriteItemId) {
    return <div>No account ID found</div>;
  }

  // Fetch account details
  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          Welcome Raghav
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={account?.transactions || []}
        banks={accountsData}
      />
    </section>
  );
};

export default Home;