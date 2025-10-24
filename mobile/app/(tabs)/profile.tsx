import SignOutButton from '@/components/auth-buttons/sign-out-button';
import CustomSegmentedButton from '@/components/CustomSegmentedButtons';
import ErrorDialog from '@/components/ErrorDialog';
import SectionLabel from '@/components/SectionLabel';
import TextInput from '@/components/TextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
import { AppTheme } from '@/constants/theme';
import { useAuthContext } from '@/context/AuthContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { UserErrorMessages } from '@/utils/errorMessages';
import { ErrorCode } from '@shared/index';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const EQUIPMENT_LIST = [
  { id: 'bodyweight', label: 'Bodyweight' },
  { id: 'barbell', label: 'Barbell' },
  { id: 'dumbbells', label: 'Dumbbells' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'ez_bar', label: 'EZ Bar' },
  { id: 'cable_machine', label: 'Cable Machine' },
  { id: 'leg_press', label: 'Leg Press' },
  { id: 'leg_curl_machine', label: 'Leg Curl Machine' },
  { id: 'leg_extension_machine', label: 'Leg Extension Machine' },
  { id: 'chest_press_machine', label: 'Chest Press Machine' },
  { id: 'lat_pulldown_machine', label: 'Lat Pulldown' },
  { id: 'rowing_machine', label: 'Rowing Machine' },
  { id: 'smith_machine', label: 'Smith Machine' },
  { id: 'bench', label: 'Bench' },
  { id: 'rack', label: 'Rack' },
  { id: 'pull_up_bar', label: 'Pull-up Bar' },
  { id: 'dip_station', label: 'Dip Station' },
  { id: 'resistance_bands', label: 'Resistance Bands' },
  { id: 'stability_ball', label: 'Stability Ball' },
  { id: 'medicine_ball', label: 'Medicine Ball' },
  { id: 'box', label: 'Box' },
  { id: 'trx', label: 'TRX' },
];

const COMMON_GOALS = [
  'Build strength',
  'Improve endurance',
  'Lose weight',
  'Gain muscle',
  'Increase flexibility',
  'General fitness',
];

const COMMON_CONSTRAINTS = ['Limited mobility', 'Pregnancy', 'I hate jumping jacks', 'Travel / little sleep'];

export default function ProfileScreen() {
  const { user, profileSettings, refreshProfile } = useAuthContext();
  const theme = useAppTheme();
  const styles = useStyles(theme);

  // local state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [units, setUnits] = useState('');

  // note: equipment data is stored as a json data type; combining equipment & 1RM as a result (prefer this over another column with 1RM values in case there's a sync issue maybe)
  const [selectedEquipment, setSelectedEquipment] = useState<
    Record<string, { label: string; oneRepMax: number | null }>
  >({});
  const [equipment1RM, setEquipment1RM] = useState<Record<string, string>>({});
  const [editingEquipment, setEditingEquipment] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [customGoal, setCustomGoal] = useState('');

  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [customConstraint, setCustomConstraint] = useState('');

  // gets equipment as json object with appropriate 1RM; transform to  array
  const selectedEquipmentArray = Object.entries(selectedEquipment);

  // indicates equipment with checkmark when toggled; associates
  const toggleEquipment = (equipmentId: string, equipmentLabel: string) => {
    setSelectedEquipment((prev) => {
      const newEquipment = { ...prev };
      if (newEquipment[equipmentId]) {
        // remove it if it exists
        delete newEquipment[equipmentId];
      } else {
        // Add with null 1RM
        newEquipment[equipmentId] = { label: equipmentLabel, oneRepMax: null };
      }
      return newEquipment;
    });
  };

  // set new value to a piece of equipment (but not save)
  const handleEdit1RM = (equipmentId: string) => {
    setEditingEquipment(equipmentId);
    setEditValue(equipment1RM[equipmentId] || '');
  };

  // save/update the 1rm to the relevant equipemt
  const handleSave1RM = () => {
    if (editingEquipment && editValue) {
      setSelectedEquipment((prev) => ({
        ...prev,
        [editingEquipment]: {
          ...prev[editingEquipment],
          oneRepMax: parseFloat(editValue),
        },
      }));
    }
    setEditingEquipment(null);
    setEditValue('');
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  // add goal if not already added
  const addCustomGoal = () => {
    if (customGoal.trim() && !selectedGoals.includes(customGoal.trim())) {
      setSelectedGoals((prev) => [...prev, customGoal.trim()]);
      setCustomGoal('');
    }
  };

  const toggleConstraint = (constraint: string) => {
    setSelectedConstraints((prev) =>
      prev.includes(constraint)
        ? prev.filter((c) => c !== constraint)
        : [...prev, constraint]
    );
  };

  const addCustomConstraint = () => {
    if (
      customConstraint.trim() &&
      !selectedConstraints.includes(customConstraint.trim())
    ) {
      setSelectedConstraints((prev) => [...prev, customConstraint.trim()]);
      setCustomConstraint('');
    }
  };

  const handleSaveProfile = async () => {
    const profileData = {
      units,
      equipment: selectedEquipment, // includes equipment name & 1RM of equipment
      goals: selectedGoals,
      constraints: selectedConstraints,
    };
    console.log('Saving profile:', profileData);
    try {
      setLoading(true);
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.log('SessionError: ,', sessionError);
        throw {
          code: UserErrorMessages.TOKEN_EXPIRED,
          status: 401,
        };
      }

      const authToken = data.session?.access_token;

      const response = await fetch(
        'http://localhost:3000/api/user/profile-settings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            profileData,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          code: responseData.code,
          status: response.status, // recall this is the error number
        };
      }

      // TODO UPDATE PROFILE CONTEXT
      await refreshProfile();

      console.log(responseData);
      alert('Profile saved successfully!');
      setLoading(false);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    // gets the settings
    const getProfileSettingsData = async () => {
      try {
        // const { data, error: sessionError } = await supabase.auth.getSession();
        // if (sessionError) {
        //   throw {
        //     code: UserErrorMessages.TOKEN_EXPIRED,
        //     status: 401,
        //   };
        // }

        // const authToken = data.session?.access_token;

        // const response = await fetch(
        //   'http://localhost:3000/api/user/profile-settings',
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: `Bearer ${authToken}`,
        //     },
        //   }
        // );

        // const responseData = await response.json();
        // console.log('RESPONSE FROM PROFILE: ', responseData[0].units);

        if (!profileSettings) {
          throw {
            code: ErrorCode.NOT_FOUND,
            status: 404,
          };
        }
        // // add data to state

        // setUnits(responseData[0].units || 'imperial');
        // setSelectedEquipment(responseData[0].equipment || {});
        // setSelectedGoals(responseData[0].goals || []);
        // setSelectedConstraints(responseData[0].constraints || []);

        setUnits(profileSettings.units || 'imperial');
        setSelectedEquipment(profileSettings.equipment || {});
        setSelectedGoals(profileSettings.goals || []);
        setSelectedConstraints(profileSettings.constraints || []);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProfileSettingsData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText variant="headlineSmall" style={styles.title}>
          Profile
        </ThemedText>
        <Card style={styles.card}>
          <Card.Content>
            <ThemedText variant="titleLarge" style={styles.sectionTitle}>
              Profile Information
            </ThemedText>

            <SectionLabel>Email</SectionLabel>
            <ThemedText variant="bodyLarge" style={styles.readOnlyText}>
              {user?.email}
            </ThemedText>

            <SectionLabel>Name</SectionLabel>
            <ThemedText variant="bodyLarge" style={styles.readOnlyText}>
              {user?.name}
            </ThemedText>

            <SectionLabel>Athlete Since</SectionLabel>
            <ThemedText variant="bodyLarge" style={styles.readOnlyText}>
              {user?.created_at &&
                new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </ThemedText>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <ThemedText variant="titleLarge" style={styles.sectionTitle}>
              Units
            </ThemedText>
            <CustomSegmentedButton
              buttonValues={['Metric (kg)', 'Imperial (lbs)']}
              selectValue={(value) =>
                setUnits(value === 'Metric (kg)' ? 'metric' : 'imperial')
              }
              defaultValue={
                units === 'metric' ? 'Metric (kg)' : 'Imperial (lbs)'
              }
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <ThemedText variant="titleLarge" style={styles.sectionTitle}>
              Available Equipment
            </ThemedText>
            <ThemedText variant="bodyMedium" style={styles.subtitle}>
              Select equipment you have access to or prefer to use. You can set
              your 1 rep max once selected.
            </ThemedText>
            <View style={styles.chipContainer}>
              {EQUIPMENT_LIST.map((equipment) => (
                <Chip
                  key={equipment.id}
                  selected={!!selectedEquipment[equipment.id]}
                  onPress={() => toggleEquipment(equipment.id, equipment.label)}
                  style={styles.chip}
                  textStyle={
                    selectedEquipment[equipment.id]
                      ? styles.chipTextSelected
                      : styles.chipText
                  }
                >
                  {equipment.label}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* show section for providing a 1 rep max if toggled in toggleEquipment; otherwise hide this section */}
        {selectedEquipmentArray.length > 0 && (
          <Card style={styles.card}>
            <Card.Content>
              <ThemedText variant="titleLarge" style={styles.sectionTitle}>
                1 Rep Max (Optional)
              </ThemedText>
              <ThemedText variant="bodyMedium" style={styles.subtitle}>
                Set your 1RM for equipment to personalize workouts. This will
                help us give better recommended workouts.
              </ThemedText>

              {selectedEquipmentArray.map(([equipmentId, equipmentData]) => {
                const isEditing = editingEquipment === equipmentId;

                return (
                  <View key={equipmentId} style={styles.equipmentRow}>
                    <ThemedText
                      variant="bodyLarge"
                      style={styles.equipmentLabel}
                    >
                      {equipmentData.label}
                    </ThemedText>

                    {isEditing ? (
                      <View style={styles.editContainer}>
                        <TextInput
                          value={editValue}
                          onChangeText={setEditValue}
                          placeholder={units === 'metric' ? 'kg' : 'lbs'}
                          placeholderTextColor={theme.colors.onSurfaceVariant}
                          keyboardType="numeric"
                          style={styles.input}
                          autoFocus
                        />
                        <ThemedButton
                          mode="contained"
                          variant="contained"
                          onPress={handleSave1RM}
                          compact
                        >
                          Save
                        </ThemedButton>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.valueContainer}
                        onPress={() => handleEdit1RM(equipmentId)}
                      >
                        <ThemedText
                          variant="bodyMedium"
                          style={styles.valueText}
                        >
                          {equipmentData.oneRepMax
                            ? `${equipmentData.oneRepMax} ${
                                units === 'metric' ? 'kg' : 'lbs'
                              } - Tap to edit`
                            : 'Tap to set'}
                        </ThemedText>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Content>
            <ThemedText variant="titleLarge" style={styles.sectionTitle}>
              Goals
            </ThemedText>

            <View style={styles.chipContainer}>
              {COMMON_GOALS.map((goal) => (
                <Chip
                  key={goal}
                  selected={selectedGoals.includes(goal)}
                  onPress={() => toggleGoal(goal)}
                  style={styles.chip}
                  textStyle={
                    selectedGoals.includes(goal)
                      ? styles.chipTextSelected
                      : styles.chipText
                  }
                >
                  {goal}
                </Chip>
              ))}
              {selectedGoals
                .filter((g) => !COMMON_GOALS.includes(g))
                .map((goal) => (
                  <Chip
                    key={goal}
                    selected
                    onPress={() => toggleGoal(goal)}
                    style={styles.chip}
                    textStyle={styles.chipTextSelected}
                  >
                    {goal}
                  </Chip>
                ))}
            </View>

            <SectionLabel>Add Custom Goal</SectionLabel>
            <View style={styles.customInputContainer}>
              <View style={{ flex: 1 }}>
                <TextInput
                  value={customGoal}
                  onChangeText={setCustomGoal}
                  placeholder="e.g., Run a marathon"
                  maxLength={25}
                />
              </View>
              <ThemedButton
                mode="outlined"
                variant="outlined"
                onPress={addCustomGoal}
                style={styles.addButton}
                compact
              >
                Add
              </ThemedButton>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <ThemedText variant="titleLarge" style={styles.sectionTitle}>
              Constraints
            </ThemedText>
            <ThemedText variant="bodyMedium" style={styles.subtitle}>
              Any injuries or limitations we should know about
            </ThemedText>

            <View style={styles.chipContainer}>
              {COMMON_CONSTRAINTS.map((constraint) => (
                <Chip
                  key={constraint}
                  selected={selectedConstraints.includes(constraint)}
                  onPress={() => toggleConstraint(constraint)}
                  style={styles.chip}
                  textStyle={
                    selectedConstraints.includes(constraint)
                      ? styles.chipTextSelected
                      : styles.chipText
                  }
                >
                  {constraint}
                </Chip>
              ))}
              {selectedConstraints
                .filter((c) => !COMMON_CONSTRAINTS.includes(c))
                .map((constraint) => (
                  <Chip
                    key={constraint}
                    selected
                    onPress={() => toggleConstraint(constraint)}
                    style={styles.chip}
                    textStyle={styles.chipTextSelected}
                  >
                    {constraint}
                  </Chip>
                ))}
            </View>

            <SectionLabel>Add Custom Constraint</SectionLabel>
            <View style={styles.customInputContainer}>
              <View style={{ flex: 1 }}>
                <TextInput
                  returnKeyType="next"
                  value={customConstraint}
                  onChangeText={setCustomConstraint}
                  placeholder="e.g., Wrist injury"
                  maxLength={25}
                />
              </View>
              <ThemedButton
                mode="outlined"
                variant="outlined"
                onPress={addCustomConstraint}
                style={styles.addButton}
                compact
              >
                Add
              </ThemedButton>
            </View>
          </Card.Content>
        </Card>
        <ThemedButton
          mode="contained"
          variant="contained"
          labelStyle={{
            color: theme.colors.onPrimary,
          }}
          onPress={handleSaveProfile}
          style={styles.saveButton}
        >
          Save Profile
        </ThemedButton>
        <SignOutButton />
        {error && <ErrorDialog error={error} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        scrollContent: {
          padding: theme.spacing.md,
          gap: theme.spacing.md,
        },
        title: {
          fontWeight: 'bold',
          color: theme.colors.onBackground,
        },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
        },
        sectionTitle: {
          color: theme.colors.onSurface,
          marginBottom: theme.spacing.md,
          fontWeight: 'bold',
        },
        subtitle: {
          color: theme.colors.onSurfaceVariant,
          marginBottom: theme.spacing.md,
        },
        readOnlyText: {
          color: theme.colors.onSurfaceVariant,
          marginBottom: theme.spacing.md,
        },
        chipContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing.sm,
        },
        chip: {
          marginRight: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
        },
        chipText: {
          color: theme.colors.onSurfaceVariant,
        },
        chipTextSelected: {
          color: theme.colors.onPrimary,
          fontWeight: 'bold',
        },
        equipmentRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surfaceVariant,
        },
        equipmentLabel: {
          color: theme.colors.onSurface,
          flex: 1,
        },
        valueContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
        },
        valueText: {
          color: theme.colors.onSurfaceVariant,
        },
        editIcon: {
          fontSize: 16,
        },
        editContainer: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          alignItems: 'center',
        },
        input: {
          padding: theme.spacing.sm,
          borderRadius: theme.borderRadius.sm,
          borderWidth: 1,
          borderColor: theme.colors.surfaceVariant,
          backgroundColor: theme.colors.background,
          color: theme.colors.onSurface,
          width: 80,
          height: 25,
        },
        customInputContainer: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          alignItems: 'flex-start',
        },
        addButton: {
          alignSelf: 'flex-start',
        },
        saveButton: {
          marginTop: theme.spacing.md,
        },
      }),
    [theme]
  );
