import dynamic from "next/dynamic";
export const components = {
  PageBanner: dynamic(() =>
    import("../../components/blocks/PageBanner").then(
      (module) => module.default
    )
  ),

  Slider: dynamic(() =>
    import("../../components/blocks/Slider").then((module) => module.default)
  ),
  Destination: dynamic(() =>
    import("../../components/blocks/Destination").then(
      (module) => module.default
    )
  ),
  Introduction: dynamic(() =>
    import("../../components/blocks/Introduction").then(
      (module) => module.default
    )
  ),
  OurCollection: dynamic(() =>
    import("../../components/blocks/OurCollection").then(
      (module) => module.default
    )
  ),

  CallToActions: dynamic(() =>
    import("../../components/blocks/CallToActions").then(
      (module) => module.default
    )
  ),
  HeroGridRepeater: dynamic(() =>
    import("../../components/blocks/HeroGridRepeater").then(
      (module) => module.default
    )
  ),
  GridFloatBookDirect: dynamic(() =>
    import("../../components/blocks/GridFloatBookDirect").then(
      (module) => module.default
    )
  ),
  DiscoverBlog: dynamic(() =>
    import("../../components/blocks/DiscoverBlog").then(
      (module) => module.default
    )
  ),
  Feature: dynamic(() =>
    import("../../components/blocks/Feature").then((module) => module.default)
  ),
  AdvocaciesReviews: dynamic(() =>
    import("../../components/blocks/AdvocaciesReviews").then(
      (module) => module.default
    )
  ),
  Description: dynamic(() =>
    import("../../components/blocks/Description").then(
      (module) => module.default
    )
  ),
  Selection: dynamic(() =>
    import("../../components/blocks/Selection").then((module) => module.default)
  ),
  Awards: dynamic(() =>
    import("../../components/blocks/Awards").then((module) => module.default)
  ),
  CarouselGallery: dynamic(() =>
    import("../../components/blocks/CarouselGallery").then(
      (module) => module.default
    )
  ),
  BlogBlock: dynamic(() =>
    import("../../components/blocks/BlogBlock").then((module) => module.default)
  ),
  Title: dynamic(() =>
    import("../../components/blocks/Title").then((module) => module.default)
  ),

  PressRelease: dynamic(() =>
    import("../../components/blocks/PressRelease").then(
      (module) => module.default
    )
  ),
  Offers: dynamic(() =>
    import("../../components/blocks/Offers").then((module) => module.default)
  ),
  MeetingsEvents: dynamic(() =>
    import("../../components/blocks/MeetingsEvents").then(
      (module) => module.default
    )
  ),
  PromosBlock: dynamic(() =>
    import("../../components/blocks/PromosBlock").then(
      (module) => module.default
    )
  ),
  PhotoGallery: dynamic(() =>
    import("../../components/blocks/PhotoGallery").then(
      (module) => module.default
    )
  ),
  RoomsSuiteBlock: dynamic(() =>
    import("../../components/blocks/RoomsSuiteBlock").then(
      (module) => module.default
    )
  ),
  ContactUsBlock: dynamic(() =>
    import("../../components/blocks/ContactUsBlock").then(
      (module) => module.default
    )
  ),
  ExperienceSelections: dynamic(() =>
    import("../../components/blocks/ExperienceSelections").then(
      (module) => module.default
    )
  ),
  Experience: dynamic(() =>
    import("../../components/blocks/Experience").then(
      (module) => module.default
    )
  ),
  DiningBlock: dynamic(() =>
    import("../../components/blocks/DiningBlock").then(
      (module) => module.default
    )
  ),
  OffersSelections: dynamic(() =>
    import("../../components/blocks/OffersSelections").then(
      (module) => module.default
    )
  ),
  ButtonsBlock: dynamic(() =>
    import("../../components/blocks/ButtonsBlock").then(
      (module) => module.default
    )
  ),
  BlogReviews: dynamic(() =>
    import("../../components/blocks/BlogReviews").then(
      (module) => module.default
    )
  ),
  Accordion: dynamic(() =>
    import("../../components/blocks/Accordion").then((module) => module.default)
  ),
  TripAdvisorWidget: dynamic(() =>
    import("../../components/blocks/TripAdvisorWidget").then(
      (module) => module.default
    )
  ),
  GuestFeedbackBlock: dynamic(() =>
    import("../../components/blocks/GuestFeedbackBlock").then(
      (module) => module.default
    )
  ),
  EmbedCode: dynamic(() =>
    import("../../components/blocks/EmbedCode").then((module) => module.default)
  ),
  RequestProposal: dynamic(() =>
    import("../../components/blocks/RequestProposal").then(
      (module) => module.default
    )
  ),

  SpaInquiry: dynamic(() =>
    import("../../components/blocks/SpaInquiry").then(
      (module) => module.default
    )
  ),

  CardOverlay: dynamic(() =>
    import("../../components/blocks/CardOverlay").then(
      (module) => module.default
    )
  ),

  Feature2: dynamic(() =>
    import("../../components/blocks/Feature2").then((module) => module.default)
  ),

  TestBlock: dynamic(() =>
    import("../../components/blocks/TestBlock").then((module) => module.default)
  ),
  TestSlider: dynamic(() =>
    import("../../components/blocks/TestSlider").then(
      (module) => module.default
    )
  ),
  PageHeaderMagazine: dynamic(() =>
    import("../../components/blocks/PageHeaderMagazine").then(
      (module) => module.default
    )
  ),
  MagazineFeature: dynamic(() =>
    import("../../components/blocks/MagazineFeature").then(
      (module) => module.default
    )
  ),

  Webform: dynamic(() =>
    import("../../components/blocks/Webform").then((module) => module.default)
  ),

  CarouselGallery2: dynamic(() =>
    import("../../components/blocks/CarouselGallery2").then(
      (module) => module.default
    )
  ),
  OurCollectionSelection: dynamic(() =>
    import("../../components/blocks/OurCollectionSelection").then(
      (module) => module.default
    )
  ),

  OurCollectionGrid: dynamic(() =>
    import("../../components/blocks/OurCollectionGrid").then(
      (module) => module.default
    )
  ),
  PageDestination: dynamic(() =>
    import("../../components/blocks/PageDestination").then(
      (module) => module.default
    )
  ),
  DiscoverBlog2: dynamic(() =>
    import("../../components/blocks/DiscoverBlog2").then(
      (module) => module.default
    )
  ),
  CardOverlayCarousel: dynamic(() =>
    import("../../components/blocks/CardOverlayCarousel").then(
      (module) => module.default
    )
  ),
};
