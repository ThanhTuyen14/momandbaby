import type { BabyGender } from '../../components/baby/BabyInfoModal';
import foodImageUrl from '../../assets/dinhduong.png';

export type NutritionAudience = 'pregnant' | 'postpartum' | 'child';
export type AgeBand = '0-6m' | '6-12m' | '1-3y' | '3-6y' | '6y-plus';
export type MomStage = 'trimester-1' | 'trimester-2' | 'trimester-3' | 'postpartum';
export type NutritionGoal =
  | 'gain-weight'
  | 'grow-height'
  | 'brain'
  | 'immunity'
  | 'weaning'
  | 'constipation';
export type Allergy = 'none' | 'egg' | 'milk' | 'seafood' | 'peanut';
export type GrowthStatus = 'standard' | 'underweight' | 'overweight' | 'stunting-risk';

export type BabyNutritionProfile = {
  id: string;
  name: string;
  gender: BabyGender;
  birthDate: string;
  height: number;
  weight: number;
  allergies: Allergy[];
  dislikes: string[];
  conditions: string[];
};

export type NutritionFilterState = {
  audience: NutritionAudience;
  ageBand: AgeBand;
  momStage: MomStage;
  allergies: Allergy[];
  goal: NutritionGoal;
};

export type MealSlot = 'breakfast' | 'snack-1' | 'lunch' | 'snack-2' | 'dinner';

export type MealSuggestion = {
  id: string;
  slot: MealSlot;
  slotLabel: string;
  name: string;
  calories: number;
  protein: number;
  carb: number;
  fat: number;
  prepTime: number;
  ageLabel: string;
  imageUrl: string;
  rating: number;
  ingredients: string[];
  steps: string[];
  tags: string[];
  avoidAllergies: Allergy[];
  alternatives: string[];
  sourceIds: string[];
};

export type NutritionPlan = {
  id: string;
  createdAt: string;
  meals: MealSuggestion[];
  stats: {
    mains: number;
    snacks: number;
    calories: number;
    water: string;
  };
  macro: {
    protein: number;
    carb: number;
    fat: number;
    vitamin: number;
  };
  achievement: number;
  tips: string[];
  profileSummary: {
    ageLabel: string;
    stageLabel: string;
    status: GrowthStatus;
    statusLabel: string;
    goalLabel: string;
  };
  sourceIds: string[];
};

type DishTemplate = Omit<MealSuggestion, 'id' | 'slot' | 'slotLabel' | 'sourceIds'> & {
  mealTypes: MealSlot[];
  ageBands: AgeBand[];
  goals: NutritionGoal[];
  growthStatuses: GrowthStatus[];
};

type PlanContext = {
  filter: NutritionFilterState;
  generation: number;
  previousMealIds?: string[];
  profile?: BabyNutritionProfile;
};

const trustedSources = [
  {
    id: 'who-complementary-feeding',
    name: 'WHO - Complementary feeding',
    url: 'https://www.who.int/health-topics/complementary-feeding',
  },
  {
    id: 'who-guideline-2023',
    name: 'WHO Guideline 2023',
    url: 'https://www.who.int/publications/i/item/9789240081864',
  },
  {
    id: 'unicef-complementary-feeding',
    name: 'UNICEF - Improving young children diets',
    url: 'https://www.unicef.org/documents/improving-young-childrens-diets-during-complementary-feeding-period-unicef-programming',
  },
  {
    id: 'national-institute-nutrition',
    name: 'Viện Dinh dưỡng Quốc gia',
    url: 'https://viendinhduong.vn/',
  },
];

const accountBabyProfiles: BabyNutritionProfile[] = [
  {
    id: 'bong',
    name: 'Bé Bông',
    gender: 'girl',
    birthDate: '2024-12-10',
    height: 82.1,
    weight: 10.1,
    allergies: ['egg'],
    dislikes: ['bí đỏ'],
    conditions: [],
  },
  {
    id: 'bin',
    name: 'Bé Bin',
    gender: 'boy',
    birthDate: '2024-10-05',
    height: 82.4,
    weight: 10.9,
    allergies: ['none'],
    dislikes: ['rau cải'],
    conditions: ['táo bón nhẹ'],
  },
  {
    id: 'miu',
    name: 'Bé Miu',
    gender: 'girl',
    birthDate: '2025-01-20',
    height: 75.1,
    weight: 8.2,
    allergies: ['milk'],
    dislikes: ['cà rốt'],
    conditions: ['nguy cơ thấp còi'],
  },
];

const allergyLabels: Record<Allergy, string> = {
  none: 'Không',
  egg: 'Trứng',
  milk: 'Sữa',
  seafood: 'Hải sản',
  peanut: 'Đậu phộng',
};

const ageBandLabels: Record<AgeBand, string> = {
  '0-6m': '0-6 tháng',
  '6-12m': '6-12 tháng',
  '1-3y': '1-3 tuổi',
  '3-6y': '3-6 tuổi',
  '6y-plus': '6+ tuổi',
};

const goalLabels: Record<NutritionGoal, string> = {
  'gain-weight': 'Tăng cân',
  'grow-height': 'Tăng chiều cao',
  brain: 'Phát triển trí não',
  immunity: 'Tăng đề kháng',
  weaning: 'Ăn dặm',
  constipation: 'Giảm táo bón',
};

const momStageLabels: Record<MomStage, string> = {
  'trimester-1': 'Tam cá nguyệt 1',
  'trimester-2': 'Tam cá nguyệt 2',
  'trimester-3': 'Tam cá nguyệt 3',
  postpartum: 'Sau sinh',
};

const mealSlots: Array<{ slot: MealSlot; label: string }> = [
  { slot: 'breakfast', label: 'Bữa sáng' },
  { slot: 'snack-1', label: 'Bữa phụ' },
  { slot: 'lunch', label: 'Bữa trưa' },
  { slot: 'snack-2', label: 'Bữa phụ' },
  { slot: 'dinner', label: 'Bữa tối' },
];

const dishTemplates: DishTemplate[] = [
  {
    name: 'Cháo yến mạch thịt bò rau ngót',
    calories: 230,
    protein: 12,
    carb: 27,
    fat: 7,
    prepTime: 24,
    ageLabel: '9 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.8,
    ingredients: ['yến mạch', 'thịt bò', 'rau ngót', 'dầu ô liu'],
    steps: ['Nấu yến mạch mềm.', 'Thêm thịt bò băm chín kỹ.', 'Trộn rau ngót và dầu ô liu trước khi dùng.'],
    tags: ['Giàu sắt', 'Tăng cân', 'Protein tốt'],
    avoidAllergies: [],
    alternatives: ['ức gà', 'thịt heo nạc', 'đậu hũ non'],
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    ageBands: ['6-12m', '1-3y'],
    goals: ['gain-weight', 'grow-height', 'immunity'],
    growthStatuses: ['underweight', 'stunting-risk', 'standard'],
  },
  {
    name: 'Cơm mềm cá thu sốt cà chua',
    calories: 260,
    protein: 15,
    carb: 32,
    fat: 8,
    prepTime: 28,
    ageLabel: '12 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.7,
    ingredients: ['cơm mềm', 'cá thu', 'cà chua', 'rau củ hấp'],
    steps: ['Hấp cá thu và gỡ xương kỹ.', 'Nấu sốt cà chua nhạt.', 'Ăn cùng cơm mềm và rau củ.'],
    tags: ['Omega-3', 'Phát triển trí não', 'Đa dạng đạm'],
    avoidAllergies: ['seafood'],
    alternatives: ['ức gà', 'thịt bò', 'đậu hũ'],
    mealTypes: ['lunch', 'dinner'],
    ageBands: ['1-3y', '3-6y', '6y-plus'],
    goals: ['brain', 'grow-height', 'immunity'],
    growthStatuses: ['standard', 'stunting-risk', 'underweight'],
  },
  {
    name: 'Súp bí đỏ đậu gà',
    calories: 190,
    protein: 7,
    carb: 29,
    fat: 5,
    prepTime: 22,
    ageLabel: '7 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.6,
    ingredients: ['bí đỏ', 'đậu gà', 'khoai tây', 'dầu hạt cải'],
    steps: ['Hấp mềm bí đỏ và khoai tây.', 'Xay cùng đậu gà chín.', 'Thêm dầu tốt khi súp còn ấm.'],
    tags: ['Ăn dặm', 'Chất xơ', 'Năng lượng tốt'],
    avoidAllergies: [],
    alternatives: ['khoai lang', 'đậu lăng', 'cà rốt'],
    mealTypes: ['breakfast', 'dinner'],
    ageBands: ['6-12m', '1-3y'],
    goals: ['weaning', 'constipation', 'gain-weight'],
    growthStatuses: ['standard', 'underweight'],
  },
  {
    name: 'Sữa chua chuối bơ nghiền',
    calories: 210,
    protein: 6,
    carb: 24,
    fat: 10,
    prepTime: 8,
    ageLabel: '8 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.9,
    ingredients: ['sữa chua', 'chuối', 'bơ', 'hạt chia nghiền'],
    steps: ['Nghiền chuối và bơ chín.', 'Trộn cùng sữa chua không đường.', 'Rắc hạt chia nghiền mịn nếu bé phù hợp.'],
    tags: ['Bữa phụ', 'Chất béo tốt', 'Tăng cân'],
    avoidAllergies: ['milk'],
    alternatives: ['sữa chua dừa', 'khoai lang nghiền', 'lê hấp'],
    mealTypes: ['snack-1', 'snack-2'],
    ageBands: ['6-12m', '1-3y', '3-6y'],
    goals: ['gain-weight', 'constipation', 'immunity'],
    growthStatuses: ['underweight', 'standard'],
  },
  {
    name: 'Trứng hấp rau củ phô mai',
    calories: 220,
    protein: 11,
    carb: 12,
    fat: 14,
    prepTime: 18,
    ageLabel: '12 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.7,
    ingredients: ['trứng', 'cà rốt', 'bông cải', 'phô mai'],
    steps: ['Đánh trứng với nước ấm.', 'Thêm rau củ cắt nhỏ.', 'Hấp chín kỹ và dùng ấm.'],
    tags: ['Canxi', 'Protein', 'Dễ ăn'],
    avoidAllergies: ['egg', 'milk'],
    alternatives: ['đậu hũ hấp', 'thịt gà viên', 'cá basa hấp'],
    mealTypes: ['breakfast', 'lunch'],
    ageBands: ['1-3y', '3-6y', '6y-plus'],
    goals: ['grow-height', 'brain', 'gain-weight'],
    growthStatuses: ['standard', 'stunting-risk', 'underweight'],
  },
  {
    name: 'Cháo cá basa cải bó xôi',
    calories: 205,
    protein: 13,
    carb: 25,
    fat: 5,
    prepTime: 25,
    ageLabel: '9 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.6,
    ingredients: ['gạo', 'cá basa', 'cải bó xôi', 'dầu mè'],
    steps: ['Nấu cháo mềm.', 'Hấp cá và kiểm tra xương.', 'Thêm cải bó xôi băm nhuyễn.'],
    tags: ['Sắt', 'Canxi', 'Dễ tiêu'],
    avoidAllergies: ['seafood'],
    alternatives: ['thịt gà', 'thịt heo nạc', 'đậu hũ non'],
    mealTypes: ['lunch', 'dinner'],
    ageBands: ['6-12m', '1-3y'],
    goals: ['grow-height', 'immunity', 'weaning'],
    growthStatuses: ['stunting-risk', 'standard'],
  },
  {
    name: 'Miến gà nấm rau củ',
    calories: 240,
    protein: 14,
    carb: 31,
    fat: 6,
    prepTime: 26,
    ageLabel: '18 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.5,
    ingredients: ['miến', 'ức gà', 'nấm', 'cà rốt', 'rau xanh'],
    steps: ['Nấu nước dùng nhạt.', 'Xé nhỏ ức gà chín.', 'Thêm miến và rau củ mềm.'],
    tags: ['Ít béo', 'Đề kháng', 'Rau xanh'],
    avoidAllergies: [],
    alternatives: ['cá thu', 'thịt bò nạc', 'đậu hũ'],
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    ageBands: ['1-3y', '3-6y', '6y-plus'],
    goals: ['immunity', 'constipation', 'brain'],
    growthStatuses: ['standard', 'overweight'],
  },
  {
    name: 'Cơm nắm cá hồi rong biển',
    calories: 270,
    protein: 15,
    carb: 34,
    fat: 9,
    prepTime: 20,
    ageLabel: '2 tuổi+',
    imageUrl: foodImageUrl,
    rating: 4.8,
    ingredients: ['cơm', 'cá hồi', 'rong biển', 'mè trắng'],
    steps: ['Áp chảo cá hồi chín kỹ.', 'Trộn cơm mềm với cá và rong biển vụn.', 'Nắm nhỏ vừa tay bé.'],
    tags: ['Omega-3', 'Tự xúc ăn', 'Não bộ'],
    avoidAllergies: ['seafood'],
    alternatives: ['cá thu', 'ức gà', 'thịt bò băm'],
    mealTypes: ['lunch', 'dinner'],
    ageBands: ['1-3y', '3-6y', '6y-plus'],
    goals: ['brain', 'gain-weight'],
    growthStatuses: ['standard', 'underweight'],
  },
  {
    name: 'Salad khoai lang ức gà',
    calories: 210,
    protein: 16,
    carb: 26,
    fat: 4,
    prepTime: 18,
    ageLabel: '3 tuổi+',
    imageUrl: foodImageUrl,
    rating: 4.5,
    ingredients: ['khoai lang', 'ức gà', 'dưa leo', 'sữa chua không đường'],
    steps: ['Hấp khoai lang mềm.', 'Xé ức gà chín.', 'Trộn cùng rau củ cắt nhỏ.'],
    tags: ['Ít đường', 'No lâu', 'Rau củ'],
    avoidAllergies: ['milk'],
    alternatives: ['dầu ô liu', 'cá hấp', 'đậu hũ áp chảo'],
    mealTypes: ['lunch', 'dinner'],
    ageBands: ['3-6y', '6y-plus'],
    goals: ['immunity', 'constipation'],
    growthStatuses: ['overweight', 'standard'],
  },
  {
    name: 'Táo hấp quế yến mạch',
    calories: 145,
    protein: 4,
    carb: 29,
    fat: 3,
    prepTime: 14,
    ageLabel: '9 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.6,
    ingredients: ['táo', 'yến mạch', 'quế', 'hạt lanh nghiền'],
    steps: ['Hấp táo mềm.', 'Nấu yến mạch sánh.', 'Trộn táo nghiền và hạt lanh mịn.'],
    tags: ['Bữa phụ', 'Chất xơ', 'Giảm táo bón'],
    avoidAllergies: [],
    alternatives: ['lê hấp', 'chuối', 'đu đủ chín'],
    mealTypes: ['snack-1', 'snack-2'],
    ageBands: ['6-12m', '1-3y', '3-6y', '6y-plus'],
    goals: ['constipation', 'weaning', 'immunity'],
    growthStatuses: ['standard', 'overweight'],
  },
  {
    name: 'Bánh pancake chuối yến mạch',
    calories: 215,
    protein: 8,
    carb: 32,
    fat: 6,
    prepTime: 16,
    ageLabel: '12 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.7,
    ingredients: ['chuối', 'yến mạch', 'trứng', 'sữa'],
    steps: ['Xay chuối và yến mạch.', 'Áp chảo lửa nhỏ đến chín.', 'Cắt miếng nhỏ vừa ăn.'],
    tags: ['Ăn bốc', 'Năng lượng', 'Bữa sáng'],
    avoidAllergies: ['egg', 'milk'],
    alternatives: ['khoai lang viên', 'bánh yến mạch không trứng', 'bơ nghiền'],
    mealTypes: ['breakfast', 'snack-1'],
    ageBands: ['1-3y', '3-6y', '6y-plus'],
    goals: ['gain-weight', 'brain'],
    growthStatuses: ['underweight', 'standard'],
  },
  {
    name: 'Canh tôm rau dền cơm mềm',
    calories: 250,
    protein: 17,
    carb: 30,
    fat: 6,
    prepTime: 24,
    ageLabel: '18 tháng+',
    imageUrl: foodImageUrl,
    rating: 4.4,
    ingredients: ['tôm', 'rau dền', 'cơm mềm', 'dầu ô liu'],
    steps: ['Băm tôm và nấu chín kỹ.', 'Thêm rau dền thái nhỏ.', 'Dùng với cơm mềm.'],
    tags: ['Kẽm', 'Canxi', 'Tăng chiều cao'],
    avoidAllergies: ['seafood'],
    alternatives: ['thịt bò', 'ức gà', 'cá basa'],
    mealTypes: ['lunch', 'dinner'],
    ageBands: ['1-3y', '3-6y'],
    goals: ['grow-height', 'immunity'],
    growthStatuses: ['stunting-risk', 'standard'],
  },
];

const defaultFilter: NutritionFilterState = {
  audience: 'child',
  ageBand: '1-3y',
  momStage: 'postpartum',
  allergies: ['none'],
  goal: 'immunity',
};

const normalizeAllergies = (allergies: Allergy[]) => allergies.filter((allergy) => allergy !== 'none');

const getAgeInMonths = (birthDate: string, compareDate = new Date()) => {
  const birthAt = new Date(`${birthDate}T00:00:00`);
  const months =
    (compareDate.getFullYear() - birthAt.getFullYear()) * 12 +
    compareDate.getMonth() -
    birthAt.getMonth();

  return Math.max(0, months + (compareDate.getDate() >= birthAt.getDate() ? 0 : -1));
};

const getAgeLabel = (months: number) => {
  if (months < 12) {
    return `${months} tháng`;
  }

  const years = Math.floor(months / 12);
  const extraMonths = months % 12;

  return extraMonths ? `${years} tuổi ${extraMonths} tháng` : `${years} tuổi`;
};

const getAgeBandFromMonths = (months: number): AgeBand => {
  if (months < 6) {
    return '0-6m';
  }

  if (months < 12) {
    return '6-12m';
  }

  if (months < 36) {
    return '1-3y';
  }

  if (months < 72) {
    return '3-6y';
  }

  return '6y-plus';
};

const getGrowthStatus = (profile?: BabyNutritionProfile): GrowthStatus => {
  if (!profile) {
    return 'standard';
  }

  const ageMonths = getAgeInMonths(profile.birthDate);
  const expectedWeight = 7.2 + Math.max(ageMonths - 6, 0) * 0.18 + (profile.gender === 'boy' ? 0.5 : 0);
  const expectedHeight = 65.5 + Math.max(ageMonths - 6, 0) * 0.75 + (profile.gender === 'boy' ? 1.2 : 0);

  if (profile.height < expectedHeight - 4) {
    return 'stunting-risk';
  }

  if (profile.weight < expectedWeight - 1.2) {
    return 'underweight';
  }

  if (profile.weight > expectedWeight + 2.2) {
    return 'overweight';
  }

  return 'standard';
};

const getGrowthStatusLabel = (status: GrowthStatus) => {
  if (status === 'underweight') {
    return 'Thiếu cân';
  }

  if (status === 'overweight') {
    return 'Thừa cân';
  }

  if (status === 'stunting-risk') {
    return 'Nguy cơ thấp còi';
  }

  return 'Đạt chuẩn';
};

const getGoalForStatus = (status: GrowthStatus, fallback: NutritionGoal): NutritionGoal => {
  if (status === 'underweight') {
    return 'gain-weight';
  }

  if (status === 'stunting-risk') {
    return 'grow-height';
  }

  if (status === 'overweight') {
    return 'constipation';
  }

  return fallback;
};

const scoreDish = (
  dish: DishTemplate,
  slot: MealSlot,
  ageBand: AgeBand,
  goal: NutritionGoal,
  status: GrowthStatus,
  allergies: Allergy[],
  dislikes: string[],
  previousMealIds: string[],
  generation: number,
) => {
  if (!dish.mealTypes.includes(slot) || !dish.ageBands.includes(ageBand)) {
    return -1000;
  }

  if (dish.avoidAllergies.some((allergy) => allergies.includes(allergy))) {
    return -1000;
  }

  if (dish.ingredients.some((ingredient) => dislikes.some((dislike) => ingredient.includes(dislike)))) {
    return -40;
  }

  let score = 20;
  score += dish.goals.includes(goal) ? 18 : 0;
  score += dish.growthStatuses.includes(status) ? 14 : 0;
  score += previousMealIds.includes(dish.name) ? -26 : 0;
  score += (dish.name.length + generation * 7 + slot.length) % 11;

  return score;
};

const pickDishForSlot = (
  slot: MealSlot,
  selectedNames: string[],
  context: PlanContext,
  ageBand: AgeBand,
  goal: NutritionGoal,
  status: GrowthStatus,
) => {
  const allergies = normalizeAllergies(context.profile?.allergies ?? context.filter.allergies);
  const dislikes = context.profile?.dislikes ?? [];
  const previousMealIds = context.previousMealIds ?? [];

  const ranked = dishTemplates
    .filter((dish) => !selectedNames.includes(dish.name))
    .map((dish) => ({
      dish,
      score: scoreDish(
        dish,
        slot,
        ageBand,
        goal,
        status,
        allergies,
        dislikes,
        previousMealIds,
        context.generation,
      ),
    }))
    .sort((first, second) => second.score - first.score);

  return ranked.find((item) => item.score > -1000)?.dish ?? ranked[0]?.dish ?? dishTemplates[0];
};

const getNutritionTips = (status: GrowthStatus, goal: NutritionGoal, profile?: BabyNutritionProfile) => {
  const baseTips = [
    'Ưu tiên món mềm, ít gia vị và chế biến an toàn theo độ tuổi.',
    'Theo dõi phản ứng dị ứng khi giới thiệu thực phẩm mới.',
    'Giữ nhịp bữa chính và bữa phụ ổn định để bé dễ hợp tác hơn.',
  ];

  if (status === 'underweight') {
    return [
      'Tăng năng lượng bằng chất béo tốt như bơ, dầu ô liu, cá béo nếu bé phù hợp.',
      'Kết hợp đạm chất lượng cao trong các bữa chính.',
      profile ? `Theo dõi cân nặng của ${profile.name} mỗi 2-4 tuần.` : baseTips[2],
    ];
  }

  if (status === 'stunting-risk') {
    return [
      'Ưu tiên thực phẩm giàu canxi, kẽm, vitamin D và protein.',
      'Khuyến khích vận động ngoài trời phù hợp độ tuổi.',
      'Nên trao đổi chuyên gia nếu chiều cao tăng chậm qua nhiều tháng.',
    ];
  }

  if (status === 'overweight') {
    return [
      'Tăng rau xanh, trái cây nguyên miếng và giảm đồ uống ngọt.',
      'Ưu tiên hấp, luộc, áp chảo ít dầu.',
      'Giữ khẩu phần vừa đủ và tôn trọng tín hiệu no của bé.',
    ];
  }

  if (goal === 'brain') {
    return ['Bổ sung cá, trứng hoặc lựa chọn thay thế phù hợp dị ứng.', ...baseTips.slice(1)];
  }

  return baseTips;
};

const buildPlanFromContext = (context: PlanContext): NutritionPlan => {
  const ageMonths = context.profile ? getAgeInMonths(context.profile.birthDate) : 18;
  const ageBand = context.profile ? getAgeBandFromMonths(ageMonths) : context.filter.ageBand;
  const status = getGrowthStatus(context.profile);
  const goal = getGoalForStatus(status, context.filter.goal);
  const selectedNames: string[] = [];

  const meals = mealSlots.map(({ slot, label }, index) => {
    const dish = pickDishForSlot(slot, selectedNames, context, ageBand, goal, status);
    selectedNames.push(dish.name);

    return {
      ...dish,
      id: `${context.generation}-${index}-${dish.name}`,
      slot,
      slotLabel: label,
      sourceIds: trustedSources.slice(0, 3).map((source) => source.id),
    };
  });

  const calories = meals.reduce((total, meal) => total + meal.calories, 0);
  const protein = meals.reduce((total, meal) => total + meal.protein, 0);
  const carb = meals.reduce((total, meal) => total + meal.carb, 0);
  const fat = meals.reduce((total, meal) => total + meal.fat, 0);
  const vitamin = Math.min(100, 62 + meals.filter((meal) => meal.tags.some((tag) => /rau|xơ|Canxi|Vitamin/i.test(tag))).length * 9);

  return {
    id: `plan-${Date.now()}-${context.generation}`,
    createdAt: new Date().toISOString(),
    meals,
    stats: {
      mains: meals.filter((meal) => ['breakfast', 'lunch', 'dinner'].includes(meal.slot)).length,
      snacks: meals.filter((meal) => meal.slot.includes('snack')).length,
      calories,
      water: ageBand === '6-12m' ? '600ml' : ageBand === '1-3y' ? '900ml' : '1.2L',
    },
    macro: {
      protein,
      carb,
      fat,
      vitamin,
    },
    achievement: Math.min(98, Math.round((protein * 1.9 + vitamin + Math.min(calories / 10, 100)) / 3)),
    tips: getNutritionTips(status, goal, context.profile),
    profileSummary: {
      ageLabel: context.profile ? getAgeLabel(ageMonths) : ageBandLabels[ageBand],
      stageLabel: ageBand === '6-12m' ? 'Ăn dặm' : `Thực đơn ${ageBandLabels[ageBand]}`,
      status,
      statusLabel: getGrowthStatusLabel(status),
      goalLabel: goalLabels[goal],
    },
    sourceIds: trustedSources.map((source) => source.id),
  };
};

const generateNutritionPlan = async (context: PlanContext) =>
  new Promise<NutritionPlan>((resolve) => {
    window.setTimeout(() => resolve(buildPlanFromContext(context)), 760);
  });

export {
  accountBabyProfiles,
  ageBandLabels,
  allergyLabels,
  defaultFilter,
  generateNutritionPlan,
  getAgeBandFromMonths,
  getAgeInMonths,
  goalLabels,
  momStageLabels,
  trustedSources,
};
