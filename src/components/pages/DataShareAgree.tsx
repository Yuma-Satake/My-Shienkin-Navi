import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { DataResultPage } from './DataResultPage';
import {
  Checkbox,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  List,
  ListItem,
} from '@mui/material';
import { Box } from '@mui/system';
import { Col } from '../common/Col';
import { CommonButton } from '../common/CommonButton';

export const DataShareAgreePage: FC = () => {
  const navigate = useNavigate();

  const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState<boolean>(true);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [checkBoxError, setCheckBoxError] = useState(false);

  const selectShare = [true, true, false, false]; //前の画面で選択されたデータの番号を受け取る
  const agreeList = [
    '所得・個人住民税情報',
    '国民年金・被用者年金の給付・保険料徴収の情報',
    '銀行名、支店名、口座番号、および口座名義カナなどの公金受取口座の情報',
    '住民票関係情報API',
    '特定健診情報',
  ];

  const checkHandle = () => {
    setIsCheck(!isCheck);
    setNextButtonIsDisabled(isCheck);
    setCheckBoxError(isCheck);
  };

  return (
    <>
      <MainLayout title="STEP1: 本人同意と本人確認">
        <Box>
          <Typography variant="body1" style={{ marginBottom: '40px' }}>
          My支援金ナビにおけるデータ共有機能提供のためにマイナポータルを通じて、以下の情報を取得します。
          </Typography>
          <ul>
            {agreeList.map((item, index) =>
              selectShare[index] ? <li key={item}>{item}</li> : null
            )}
          </ul>
          <Typography variant="body1" style={{ marginBottom: '40px', marginTop: '40px' }}>
            マイナポータルの利用規約に同意いただき、上記情報をMy支援金ナビに提供する場合、マイナンバーカードを利用した本人確認を行います。
          </Typography>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>
            <span style={{ color: '#FF0000' }}>必須</span>
          </Typography>
          <Stack>
            <Box>
              <Checkbox
                checked={isCheck}
                onChange={() => {
                  checkHandle();
                }}
              />
              情報の提供に同意する
            </Box>
          </Stack>
          <Typography
            variant="body1"
            sx={{ color: checkBoxError ? 'red' : 'white' }}
            style={{ marginBottom: '40px' }}
          >
            次に進むには同意する必要があります。
          </Typography>

          <Box sx={{ marginTop: '30px', mx: 2, mt: 2 }}>
            <Col spacing={2}>
              <CommonButton
                onClick={() => navigate('/PasswordEntry')}
                isDisabled={nextButtonIsDisabled}
              >
                次へ
              </CommonButton>
              <CommonButton isSecondary onClick={() => navigate('/SelectGettingDataPage')}>
                戻る
              </CommonButton>
            </Col>
          </Box>
        </Box>
      </MainLayout>
    </>
  );
};
