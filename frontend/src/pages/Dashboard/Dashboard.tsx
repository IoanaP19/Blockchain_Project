import { MutateModal } from '@multiversx/sdk-dapp-sc-explorer/components/Modals/MutateModal';
import { ScExplorerContainer } from '@multiversx/sdk-dapp-sc-explorer/containers/ScExplorerContainer';
import { contractAddress, contractAbi, environment } from 'config';
import { useGetAccountInfo, useGetLoginInfo, useScrollToElement } from 'hooks';
import { useGetSmartContractDetails } from 'hooks/useGetSmartContractDetails';
import { AuthRedirectWrapper } from 'wrappers';
import { Account } from './components/Account';
import { ContractAddress } from './components/ContractAddress';
import { Endpoints } from './components/Endpoints';

const customClassNames = {
  buttonPrimaryClassName:
    'rounded-xl px-3 py-2 text-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed',
  inputClassName:
    'text-sm border border-gray-200 bg-white rounded-xl overflow-auto p-3.5 w-full'
};

export const Dashboard = () => {
  useScrollToElement();
  const { smartContractDetails } = useGetSmartContractDetails();

  return (
    <AuthRedirectWrapper>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'>
          <p className='font-medium text-xl'>Account</p>
          <p className='text-gray-400 mb-6'>Connected account details</p>
          <Account />
        </div>
        <div className='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'>
          <p className='font-medium text-xl mb-6'>Contract</p>
          <ContractAddress />
        </div>
        <ScExplorerContainer
          smartContract={{
            contractAddress: contractAddress,
            abi: contractAbi,
            deployedContractDetails: smartContractDetails
          }}
          accountConsumerHandlers={{
            useGetLoginInfo,
            useGetAccountInfo
          }}
          networkConfig={{ environment }}
          config={{
            canMutate: true,
            canLoadAbi: false,
            canDeploy: false,
            canUpgrade: false,
            canDisplayContractDetails: false
          }}
          customClassNames={customClassNames}
          className='mx-sdk-sc'
          children={
            <>
              <MutateModal />
              <Endpoints />
            </>
          }
        />
      </div>
    </AuthRedirectWrapper>
  );
};
