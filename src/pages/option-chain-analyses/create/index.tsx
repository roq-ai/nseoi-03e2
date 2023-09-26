import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createOptionChainAnalysis } from 'apiSdk/option-chain-analyses';
import { optionChainAnalysisValidationSchema } from 'validationSchema/option-chain-analyses';
import { OptionChainAnalysisInterface } from 'interfaces/option-chain-analysis';

function OptionChainAnalysisCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OptionChainAnalysisInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOptionChainAnalysis(values);
      resetForm();
      router.push('/option-chain-analyses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OptionChainAnalysisInterface>({
    initialValues: {
      strike_price: 0,
      expiry_date: new Date(new Date().toDateString()),
      option_type: '',
      last_traded_price: 0,
      volume_traded_today: 0,
      open_interest: 0,
      implied_volatility: 0,
      change_in_open_interest: 0,
      previous_day_volume: 0,
      historical_volatility: 0,
      delta: 0,
      greeks: '',
      theta: 0,
      vega: 0,
      option_chain_timestamp: new Date(new Date().toDateString()),
      underlying_asset: '',
      option_chain_analysis: '',
      analysis_timestamp: new Date(new Date().toDateString()),
      option_chain_trend: '',
      option_chain_sentiment: '',
      analysis_summary: '',
      analysis_accuracy: 0,
      analysis_confidence_interval: 0,
      analysis_comments: '',
      analysis_update_frequency: '',
      option_chain_prediction: 0,
    },
    validationSchema: optionChainAnalysisValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

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
              label: 'Create Option Chain Analysis',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Option Chain Analysis
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Strike Price"
            formControlProps={{
              id: 'strike_price',
              isInvalid: !!formik.errors?.strike_price,
            }}
            name="strike_price"
            error={formik.errors?.strike_price}
            value={formik.values?.strike_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('strike_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="expiry_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expiry Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expiry_date ? new Date(formik.values?.expiry_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expiry_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.option_type}
            label={'Option Type'}
            props={{
              name: 'option_type',
              placeholder: 'Option Type',
              value: formik.values?.option_type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Last Traded Price"
            formControlProps={{
              id: 'last_traded_price',
              isInvalid: !!formik.errors?.last_traded_price,
            }}
            name="last_traded_price"
            error={formik.errors?.last_traded_price}
            value={formik.values?.last_traded_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('last_traded_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Volume Traded Today"
            formControlProps={{
              id: 'volume_traded_today',
              isInvalid: !!formik.errors?.volume_traded_today,
            }}
            name="volume_traded_today"
            error={formik.errors?.volume_traded_today}
            value={formik.values?.volume_traded_today}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('volume_traded_today', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Open Interest"
            formControlProps={{
              id: 'open_interest',
              isInvalid: !!formik.errors?.open_interest,
            }}
            name="open_interest"
            error={formik.errors?.open_interest}
            value={formik.values?.open_interest}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('open_interest', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Implied Volatility"
            formControlProps={{
              id: 'implied_volatility',
              isInvalid: !!formik.errors?.implied_volatility,
            }}
            name="implied_volatility"
            error={formik.errors?.implied_volatility}
            value={formik.values?.implied_volatility}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('implied_volatility', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Change In Open Interest"
            formControlProps={{
              id: 'change_in_open_interest',
              isInvalid: !!formik.errors?.change_in_open_interest,
            }}
            name="change_in_open_interest"
            error={formik.errors?.change_in_open_interest}
            value={formik.values?.change_in_open_interest}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('change_in_open_interest', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Previous Day Volume"
            formControlProps={{
              id: 'previous_day_volume',
              isInvalid: !!formik.errors?.previous_day_volume,
            }}
            name="previous_day_volume"
            error={formik.errors?.previous_day_volume}
            value={formik.values?.previous_day_volume}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('previous_day_volume', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Historical Volatility"
            formControlProps={{
              id: 'historical_volatility',
              isInvalid: !!formik.errors?.historical_volatility,
            }}
            name="historical_volatility"
            error={formik.errors?.historical_volatility}
            value={formik.values?.historical_volatility}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('historical_volatility', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Delta"
            formControlProps={{
              id: 'delta',
              isInvalid: !!formik.errors?.delta,
            }}
            name="delta"
            error={formik.errors?.delta}
            value={formik.values?.delta}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('delta', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.greeks}
            label={'Greeks'}
            props={{
              name: 'greeks',
              placeholder: 'Greeks',
              value: formik.values?.greeks,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Theta"
            formControlProps={{
              id: 'theta',
              isInvalid: !!formik.errors?.theta,
            }}
            name="theta"
            error={formik.errors?.theta}
            value={formik.values?.theta}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('theta', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Vega"
            formControlProps={{
              id: 'vega',
              isInvalid: !!formik.errors?.vega,
            }}
            name="vega"
            error={formik.errors?.vega}
            value={formik.values?.vega}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('vega', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="option_chain_timestamp" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Option Chain Timestamp
            </FormLabel>
            <DatePicker
              selected={formik.values?.option_chain_timestamp ? new Date(formik.values?.option_chain_timestamp) : null}
              onChange={(value: Date) => formik.setFieldValue('option_chain_timestamp', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.underlying_asset}
            label={'Underlying Asset'}
            props={{
              name: 'underlying_asset',
              placeholder: 'Underlying Asset',
              value: formik.values?.underlying_asset,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.option_chain_analysis}
            label={'Option Chain Analysis'}
            props={{
              name: 'option_chain_analysis',
              placeholder: 'Option Chain Analysis',
              value: formik.values?.option_chain_analysis,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="analysis_timestamp" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Analysis Timestamp
            </FormLabel>
            <DatePicker
              selected={formik.values?.analysis_timestamp ? new Date(formik.values?.analysis_timestamp) : null}
              onChange={(value: Date) => formik.setFieldValue('analysis_timestamp', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.option_chain_trend}
            label={'Option Chain Trend'}
            props={{
              name: 'option_chain_trend',
              placeholder: 'Option Chain Trend',
              value: formik.values?.option_chain_trend,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.option_chain_sentiment}
            label={'Option Chain Sentiment'}
            props={{
              name: 'option_chain_sentiment',
              placeholder: 'Option Chain Sentiment',
              value: formik.values?.option_chain_sentiment,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.analysis_summary}
            label={'Analysis Summary'}
            props={{
              name: 'analysis_summary',
              placeholder: 'Analysis Summary',
              value: formik.values?.analysis_summary,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Analysis Accuracy"
            formControlProps={{
              id: 'analysis_accuracy',
              isInvalid: !!formik.errors?.analysis_accuracy,
            }}
            name="analysis_accuracy"
            error={formik.errors?.analysis_accuracy}
            value={formik.values?.analysis_accuracy}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('analysis_accuracy', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Analysis Confidence Interval"
            formControlProps={{
              id: 'analysis_confidence_interval',
              isInvalid: !!formik.errors?.analysis_confidence_interval,
            }}
            name="analysis_confidence_interval"
            error={formik.errors?.analysis_confidence_interval}
            value={formik.values?.analysis_confidence_interval}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('analysis_confidence_interval', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.analysis_comments}
            label={'Analysis Comments'}
            props={{
              name: 'analysis_comments',
              placeholder: 'Analysis Comments',
              value: formik.values?.analysis_comments,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.analysis_update_frequency}
            label={'Analysis Update Frequency'}
            props={{
              name: 'analysis_update_frequency',
              placeholder: 'Analysis Update Frequency',
              value: formik.values?.analysis_update_frequency,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Option Chain Prediction"
            formControlProps={{
              id: 'option_chain_prediction',
              isInvalid: !!formik.errors?.option_chain_prediction,
            }}
            name="option_chain_prediction"
            error={formik.errors?.option_chain_prediction}
            value={formik.values?.option_chain_prediction}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('option_chain_prediction', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/option-chain-analyses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
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
    operation: AccessOperationEnum.CREATE,
  }),
)(OptionChainAnalysisCreatePage);
