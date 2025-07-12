import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FaMoneyBillWave, FaMotorcycle, FaRegClock, FaHandHoldingUsd } from 'react-icons/fa';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';

const features = [
  {
    icon: <FaMoneyBillWave size={48} color="#8BC34A" />, // 48px for visual match
    title: 'Different Flexible Packages',
    desc: 'Grab daily, weekly, fortnight and monthly packages at discounted rates',
  },
  {
    icon: <FaMotorcycle size={48} color="#8BC34A" />, // 48px for visual match
    title: 'Wide Range',
    desc: 'Looking for a particular brand or location? We have probably got it.',
  },
  {
    icon: <MdOutlineMiscellaneousServices size={48} color="#8BC34A" />,
    title: 'Highly Maintained Fleet',
    desc: 'Get high quality and serviced vehicles.',
  },
  {
    icon: <FaRegClock size={48} color="#8BC34A" />,
    title: '24*7 At Service',
    desc: 'Day or night, rent a bike',
  },
  {
    icon: <BiRupee size={48} color="#8BC34A" />,
    title: 'Book Now, Pay later',
    desc: 'Flexibility to decide when and how to pay.',
  },
  {
    icon: <FaHandHoldingUsd size={48} color="#8BC34A" />,
    title: 'Instant Refund',
    desc: 'Facing an issue while booking/pick up? We initiate instant refund.',
  },
];

const WhyChooseUs = () => (
  <Box component="section" sx={{ py: 2, px: 0, bgcolor: 'white' }} id="why-choose-us">
    <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 1, sm: 2 } }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        gutterBottom
        sx={{ mb: 5, color: '#222', fontSize: { xs: 28, md: 36 }, letterSpacing: '-1px' }}
      >
        Why choose Bike Rent?
      </Typography>
      <Grid container spacing={0}>
        {[0, 1, 2].map((row) => (
          <Grid
            container
            item
            xs={12}
            spacing={0}
            key={row}
            sx={{ mb: row < 2 ? 3.5 : 0, flexWrap: { xs: 'wrap', md: 'nowrap' } }}
          >
            {/* Left cell */}
            <Grid item xs={12} md={6} sx={{ pr: { md: 4 }, minWidth: { md: 320 }, mb: { xs: 2, md: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ minWidth: 44, display: 'flex', alignItems: 'flex-start', pt: '2px' }}>{features[2 * row].icon}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 17, md: 21 }, color: '#222', mb: 0.5, lineHeight: 1.2, textAlign: 'left' }}>
                    {features[2 * row].title}
                  </Typography>
                  <Typography sx={{ color: '#444', fontSize: { xs: 14, md: 15.5 }, lineHeight: 1.4, textAlign: 'left' }}>
                    {features[2 * row].desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* Right cell */}
            <Grid item xs={12} md={6} sx={{ pl: { md: 4 }, mt: { xs: 2, md: 0 }, minWidth: { md: 320 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ minWidth: 44, display: 'flex', alignItems: 'flex-start', pt: '2px' }}>{features[2 * row + 1].icon}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 17, md: 21 }, color: '#222', mb: 0.5, lineHeight: 1.2, textAlign: 'left' }}>
                    {features[2 * row + 1].title}
                  </Typography>
                  <Typography sx={{ color: '#444', fontSize: { xs: 14, md: 15.5 }, lineHeight: 1.4, textAlign: 'left' }}>
                    {features[2 * row + 1].desc}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default WhyChooseUs; 