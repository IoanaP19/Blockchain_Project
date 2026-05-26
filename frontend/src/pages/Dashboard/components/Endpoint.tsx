import { EndpointDefinition } from '@multiversx/sdk-core/out';
import { ContractEndpoint } from '@multiversx/sdk-dapp-sc-explorer/components/ContractEndpoints/ContractEndpoint';
import { EndpointTitle } from '@multiversx/sdk-dapp-sc-explorer/components/ContractEndpoints/ContractEndpoint/components/EndpointTitle';
import { whitelistEndpoints } from 'config';

export const Endpoint = ({ endpoint }: { endpoint: EndpointDefinition }) => {
  const endpointTitle = whitelistEndpoints.find(
    (whitelistEndpoint) => whitelistEndpoint.name === endpoint.name
  )?.title;
  return (
    <div className='flex flex-col flex-1 rounded-xl bg-white p-6 justify-center'>
      {endpointTitle ? (
        <div className='font-medium text-xl mb-2'>{endpointTitle}</div>
      ) : (
        <EndpointTitle endpoint={endpoint} />
      )}
      <ContractEndpoint endpoint={endpoint} />
    </div>
  );
};
