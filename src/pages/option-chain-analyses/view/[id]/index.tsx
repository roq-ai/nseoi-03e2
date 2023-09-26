import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text, Image, Button } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';
import { EntityImage } from 'components/entity-image';
import { FiEdit2 } from 'react-icons/fi';

import { getOptionChainAnalysisById } from 'apiSdk/option-chain-analyses';
import { OptionChainAnalysisInterface } from 'interfaces/option-chain-analysis';

function OptionChainAnalysisViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OptionChainAnalysisInterface>(
    () => (id ? `/option-chain-analyses/${id}` : null),
    () =>
      getOptionChainAnalysisById(id, {
        relations: [],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Option Chain Analyses',
              link: '/option-chain-analyses',
            },
            {
              label: 'Option Chain Analysis Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper wrapperProps={{ border: 'none', gap: 3, p: 0 }}>
              <Flex alignItems="center" w="full" justifyContent={'space-between'}>
                <Box>
                  <Text
                    sx={{
                      fontSize: '1.875rem',
                      fontWeight: 700,
                      color: 'base.content',
                    }}
                  >
                    Option Chain Analysis Details
                  </Text>
                </Box>
                {hasAccess('option_chain_analysis', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                  <NextLink href={`/option-chain-analyses/edit/${id}`} passHref legacyBehavior>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      mr={2}
                      padding="0rem 0.5rem"
                      height="24px"
                      fontSize="0.75rem"
                      variant="outline"
                      color="state.info.main"
                      borderRadius="6px"
                      border="1px"
                      borderColor="state.info.transparent"
                      leftIcon={<FiEdit2 width="12px" height="12px" color="state.info.main" />}
                    >
                      Edit
                    </Button>
                  </NextLink>
                )}
              </Flex>

              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem
                  label="Created At"
                  text={data?.created_at ? format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy') : ''}
                />

                <FormListItem
                  label="Updated At"
                  text={data?.updated_at ? format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy') : ''}
                />

                <FormListItem label="Strike Price" text={data?.strike_price} />

                <FormListItem
                  label="Expiry Date"
                  text={data?.expiry_date ? format(parseISO(data?.expiry_date as unknown as string), 'dd-MM-yyyy') : ''}
                />

                <FormListItem label="Option Type" text={data?.option_type} />

                <FormListItem label="Last Traded Price" text={data?.last_traded_price} />

                <FormListItem label="Volume Traded Today" text={data?.volume_traded_today} />

                <FormListItem label="Open Interest" text={data?.open_interest} />

                <FormListItem label="Implied Volatility" text={data?.implied_volatility} />

                <FormListItem label="Change In Open Interest" text={data?.change_in_open_interest} />

                <FormListItem label="Previous Day Volume" text={data?.previous_day_volume} />

                <FormListItem label="Historical Volatility" text={data?.historical_volatility} />

                <FormListItem label="Delta" text={data?.delta} />

                <FormListItem label="Greeks" text={data?.greeks} />

                <FormListItem label="Theta" text={data?.theta} />

                <FormListItem label="Vega" text={data?.vega} />

                <FormListItem
                  label="Option Chain Timestamp"
                  text={
                    data?.option_chain_timestamp
                      ? format(parseISO(data?.option_chain_timestamp as unknown as string), 'dd-MM-yyyy')
                      : ''
                  }
                />

                <FormListItem label="Underlying Asset" text={data?.underlying_asset} />

                <FormListItem label="Option Chain Analysis" text={data?.option_chain_analysis} />

                <FormListItem
                  label="Analysis Timestamp"
                  text={
                    data?.analysis_timestamp
                      ? format(parseISO(data?.analysis_timestamp as unknown as string), 'dd-MM-yyyy')
                      : ''
                  }
                />

                <FormListItem label="Option Chain Trend" text={data?.option_chain_trend} />

                <FormListItem label="Option Chain Sentiment" text={data?.option_chain_sentiment} />

                <FormListItem label="Analysis Summary" text={data?.analysis_summary} />

                <FormListItem label="Analysis Accuracy" text={data?.analysis_accuracy} />

                <FormListItem label="Analysis Confidence Interval" text={data?.analysis_confidence_interval} />

                <FormListItem label="Analysis Comments" text={data?.analysis_comments} />

                <FormListItem label="Analysis Update Frequency" text={data?.analysis_update_frequency} />

                <FormListItem label="Option Chain Prediction" text={data?.option_chain_prediction} />
              </List>
            </FormWrapper>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'option_chain_analysis',
    operation: AccessOperationEnum.READ,
  }),
)(OptionChainAnalysisViewPage);
