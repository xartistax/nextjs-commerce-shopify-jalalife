<Container
  maxWidth="lg"
  sx={{
    position: 'relative',
    textAlign: 'center',
    overflow: 'hidden'
  }}
>
  <Box sx={{ paddingTop: { xs: '30px', md: '30px' }, paddingBottom: { xs: '30px', md: '0px' } }}>
    <Box
      sx={{
        position: 'relative',
        height: '350px', // Ensure the container has the same height as slides
        overflow: 'hidden'
      }}
    >
      {/* Placeholder that is visible while the slider is loading */}
      <Placeholder fadeOut={placeholderFadeOut} />

      <SlideContainer className={sliderReady ? 'fade-in' : ''}>
        <Slide
          duration={3000}
          transitionDuration={900}
          indicators={false}
          slidesToScroll={1}
          autoplay={true}
          slidesToShow={1}
          arrows={false}
          responsive={responsiveSettings}
        >
          {products.map((product, index) => (
            <Box
              key={index}
              className="each-slide"
              sx={{
                textAlign: 'left',
                display: 'flex',
                minHeight: '350px',
                height: 'auto',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'stretch'
              }}
            >
              <ImageBox sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Box
                  component="img"
                  alt={product.title}
                  src={product.featuredImage?.url || '/placeholder-image.png'}
                  loading="lazy"
                  className="image"
                  onLoad={(e) => e.currentTarget.classList.add('loaded')}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    height: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover'
                  }}
                />
              </ImageBox>

              <Box
                sx={{
                  flex: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: '16px'
                }}
              >
                <div>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',

                      textTransform: 'uppercase',
                      className: 'text-slate-800',
                      overflow: 'hidden', // Hide overflow if title is too long
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Limits to 2 lines
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis' // Adds ellipsis if text overflows
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    component={'span'}
                    color={'primary.main'}
                    gutterBottom
                  >
                    {product.metafields[0].value}{' '}
                  </Typography>
                  <TruncatedText className="text-slate-600">
                    <Prose className="leading-tight" html={toHTML(product.metafields[1].value)} />
                  </TruncatedText>
                  <Typography
                    component="a"
                    href={`/products/${product.handle}`}
                    sx={{
                      display: 'block',
                      textAlign: { md: 'left', xs: 'left' },
                      fontWeight: { md: 'inherit', xs: 'bold' },
                      fontSize: '16px',
                      textTransform: 'uppercase',
                      paddingTop: { md: '20px', xs: '20px' },
                      color: 'primary.main'
                    }}
                  >
                    Zum Produkt
                  </Typography>
                </div>
              </Box>
            </Box>
          ))}
        </Slide>
      </SlideContainer>
    </Box>
  </Box>
</Container>;
