// @ts-nocheck
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { 
  useGetIsLoggedIn, 
  useGetAccountInfo, 
  useSendTransactions 
} from '@multiversx/sdk-dapp/hooks';
import { 
  WebWalletLoginButton, 
  TransactionsToastList, 
  SignTransactionsModals 
} from '@multiversx/sdk-dapp/UI';
import { useState } from 'react';

// --- CONFIGURATION ---
const ENVIRONMENT = 'devnet';
// Replace this with your actual deployed contract address!
const CONTRACT_ADDRESS = 'erd1qqqqqqqqqqqqqpgq...YOUR_CONTRACT_HERE...'; 

// --- 1. THE DASHBOARD COMPONENT ---
const AuctionDashboard = () => {
  const { address } = useGetAccountInfo();
  const { sendTransactions } = useSendTransactions();
  const [bidAmount, setBidAmount] = useState('');

  const handleBid = async () => {
    if (!bidAmount || Number(bidAmount) <= 0) return alert('Enter a valid bid!');
    
    // Convert EGLD to Wei (18 zeros)
    const amountInWei = BigInt(Math.floor(Number(bidAmount) * 1e18)).toString();

    await sendTransactions({
      transactions: [{
        value: amountInWei,
        data: 'bid',
        receiver: CONTRACT_ADDRESS,
        gasLimit: '60000000',
      }],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Bid...',
        errorMessage: 'Bid failed!',
        successMessage: 'Bid placed successfully!',
      },
      redirectAfterSign: false,
    });
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Decentralized Auction</h2>
      <p>Logged in as: <strong>{address}</strong></p>
      
      <div style={{ margin: '2rem 0', padding: '2rem', background: '#f4f4f9', borderRadius: '8px' }}>
        <h3>Place a Bid</h3>
        <input 
          type="number" 
          value={bidAmount} 
          onChange={(e) => setBidAmount(e.target.value)} 
          placeholder="Amount in EGLD"
          style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
        />
        <button onClick={handleBid} style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
          Send Bid
        </button>
      </div>
    </div>
  );
};

// --- 2. THE MAIN APP WRAPPER ---
export default function App() {
  return (
    <DappProvider environment={ENVIRONMENT}>
      {/* Required UI components for wallet popups and toasts */}
      <TransactionsToastList />
      <SignTransactionsModals />
      
      <MainContent />
    </DappProvider>
  );
}

// --- 3. LOGIN LOGIC ---
const MainContent = () => {
  const isLoggedIn = useGetIsLoggedIn();

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Welcome to the Auction</h2>
          <p>Please connect your wallet to continue.</p>
          <div style={{ marginTop: '1rem' }}>
            <WebWalletLoginButton callbackRoute="/" loginButtonText="Connect Web Wallet" />
          </div>
        </div>
      </div>
    );
  }

  return <AuctionDashboard />;
};