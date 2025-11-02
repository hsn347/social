
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext1';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../CliantSupa';

interface DataRow {
  id: number;
  data: {
    email: string;
    Troops: boolean;
    Attack: string[];
    options: boolean[];
    password: string;
    username: string;
    row_number: number;
    custom_flag: boolean;
    supabase_id: string;
    server_number: number;
    emulator_number: number;
  };
  created_at: string;
}

function Home() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [dataRows, setDataRows] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  // جلب البيانات مع التحقق من الصلاحيات
  const fetchData = async () => {
    if (!user) {
      setError(t.mustSignIn);
      setLoading(false);
      return;
    }

    console.log('User data:', user); // للتشخيص

    try {
      const { data, error } = await supabase
        .from('villages') // استبدل هذا باسم الجدول الفعلي
        .select('*');

      if (error) throw error;

      // فلترة البيانات بناءً على تطابق username مع user
      const filteredData = data?.filter((row: DataRow) => {
        const rowData = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
        return rowData.username === user.email || rowData.username === user.id;
      }) || [];

      setDataRows(filteredData);
    } catch (err) {
      setError(t.errorLoadingData);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchData();
    }
  }, [user, authLoading]);

  // بدء تعديل صف
  const startEdit = (row: DataRow) => {
    if (!user) {
      setError(t.mustSignIn);
      return;
    }

    // التحقق من الصلاحيات مرة أخرى
    const rowData = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
    if (rowData.username !== user.email && rowData.username !== user.id) {
      setError(t.noPermission);
      return;
    }

    setEditingRow(row.id);
    setEditData({ ...rowData });
  };

  // حفظ التعديلات
  const saveEdit = async () => {
    if (!user || !editingRow) return;

    setSaving(true);
    try {
      // التحقق من الصلاحيات مرة أخرى قبل الحفظ
      const currentRow = dataRows.find(row => row.id === editingRow);
      if (!currentRow) {
        setError(t.rowNotFound);
        return;
      }

      const currentData = typeof currentRow.data === 'string' ? JSON.parse(currentRow.data) : currentRow.data;
      if (currentData.username !== user.email && currentData.username !== user.id) {
        setError(t.noPermission);
        return;
      }

      const { error } = await supabase
        .from('villages') // استبدل هذا باسم الجدول الفعلي
        .update({ data: editData })
        .eq('id', editingRow);

      if (error) throw error;

      // تحديث البيانات المحلية
      setDataRows(prev => prev.map(row => 
        row.id === editingRow 
          ? { ...row, data: editData }
          : row
      ));

      setEditingRow(null);
      setEditData({});
    } catch (err) {
      setError(t.errorSaving);
      console.error('Error saving data:', err);
    } finally {
      setSaving(false);
    }
  };

  // إلغاء التعديل
  const cancelEdit = () => {
    setEditingRow(null);
    setEditData({});
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">
            {authLoading ? t.loadingAuth : t.loadingData}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          {t.retry}
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-[var(--text-primary)] mb-4">{t.mustSignIn}</h2>
        <div className="bg-[var(--bg-card)] rounded-lg p-4 max-w-md mx-auto mt-4 border border-[var(--border-color)] shadow-[var(--shadow-md)]">
          <h3 className="text-lg text-[var(--text-primary)] mb-2">Diagnostic Info:</h3>
          <div className="text-sm text-[var(--text-secondary)] space-y-1">
            <p>Auth Status: {authLoading ? t.loadingAuth : 'Complete'}</p>
            <p>User: {user ? 'Found' : 'Not Found'}</p>
            <p>Make sure to sign in with Google</p>
          </div>
        </div>
      </div>
    );
  }

  if (dataRows.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-gray-300 mb-4">{t.noDataAvailable}</h2>
        <p className="text-gray-400">{t.checkUsernameMatch}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-fuchsia-400 to-blue-800 bg-clip-text text-transparent">
        {t.dashboard}
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dataRows.map((row) => {
          const rowData = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
          const isEditing = editingRow === row.id;
          
          return (
            <div key={row.id} className="bg-gray-950 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{t.data}</h3>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => startEdit(row)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {t.edit}
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={saveEdit}
                        disabled={saving}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                      >
                        {saving ? t.saving : t.save}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {t.cancel}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">{t.email}</label>
                      <input
                        type="email"
                        value={editData.email || ''}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-300 mb-1">{t.password}</label>
                      <input
                        type="password"
                        value={editData.password || ''}
                        onChange={(e) => setEditData({...editData, password: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>


                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editData.Troops || false}
                        onChange={(e) => setEditData({...editData, Troops: e.target.checked})}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-300">{t.troopsTraining}</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editData.custom_flag || false}
                        onChange={(e) => setEditData({...editData, custom_flag: e.target.checked})}
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-300">{t.shield}</label>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">{t.attackOutsideCastleMaxTwo}</label>
                      <div className="space-y-2">
                        {editData.Attauck?.map((attack: string, index: number) => {
                          // تحويل فحم إلى حديد للعرض
                          const displayValue = attack === 'فحم' ? 'حديد' : attack;
                          return (
                            <div key={index} className="flex gap-2">
                              <select
                                value={displayValue}
                                onChange={(e) => {
                                  const newAttacks = [...(editData.Attauck || [])];
                                  // تحويل حديد إلى فحم في قاعدة البيانات
                                  newAttacks[index] = e.target.value === 'حديد' ? 'فحم' : e.target.value;
                                  setEditData({...editData, Attauck: newAttacks});
                                }}
                                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                              >
                                <option value="">{t.chooseAttackType}</option>
                                {['خشب', 'قمح', 'حديد', 'الماس'].map((option) => {
                                  // تحويل فحم إلى حديد للعرض في المقارنة
                                  const currentAttacks = editData.Attauck?.map((attack: string) => attack === 'فحم' ? 'حديد' : attack) || [];
                                  const isSelected = currentAttacks.includes(option) && currentAttacks.indexOf(option) !== index;
                                  
                                  return (
                                    <option 
                                      key={option} 
                                      value={option}
                                      disabled={isSelected}
                                    >
                                      {option} {isSelected ? t.alreadySelected : ''}
                                    </option>
                                  );
                                })}
                              </select>
                              <button
                                type="button"
                                onClick={() => {
                                  const newAttacks = editData.Attauck?.filter((_: any, i: number) => i !== index) || [];
                                  setEditData({...editData, Attauck: newAttacks});
                                }}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                              >
                                {t.delete}
                              </button>
                            </div>
                          );
                        })}
                        {(!editData.Attauck || editData.Attauck.length < 2) && (
                          <button
                            type="button"
                            onClick={() => {
                              const newAttacks = [...(editData.Attauck || []), ''];
                              setEditData({...editData, Attauck: newAttacks});
                            }}
                            className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            {t.addNewAttack}
                          </button>
                        )}
        </div>
        </div>

                    <div>
                      <label className="block text-sm text-gray-300 mb-2">{t.productionInsideCastle}</label>
                      <div className="grid grid-cols-2 gap-2">
                        {editData.options?.map((option: boolean, index: number) => {
                          const resourceNames = [t.wood, t.wheat, t.iron, t.diamond];
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={option}
                                onChange={(e) => {
                                  const newOptions = [...(editData.options || [])];
                                  newOptions[index] = e.target.checked;
                                  setEditData({...editData, options: newOptions});
                                }}
                                className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                              />
                              <label className="text-sm text-gray-300">{resourceNames[index] || `خيار ${index + 1}`}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.email}:</span>
                      <span className="text-white">{rowData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.troopsTraining}:</span>
                      <span className={`px-2 py-1 rounded text-xs ${rowData.Troops ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {rowData.Troops ? t.active : t.inactive}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">{t.shield}:</span>
                      <span className={`px-2 py-1 rounded text-xs ${rowData.custom_flag ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {rowData.custom_flag ? t.active : t.inactive}
                      </span>
                    </div>
                    {rowData.Attauck && rowData.Attauck.length > 0 && (
                      <div>
                        <span className="text-gray-400 block mb-1">{t.attackOutsideCastle}:</span>
                        <div className="flex flex-wrap gap-1">
                        {rowData.Attauck.map((attack: string, index: number) => {
                          // تحويل فحم إلى حديد للعرض
                          const displayValue = attack === 'فحم' ? 'حديد' : attack;
                          return (
                            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                              {displayValue}
                            </span>
                          );
                        })}
                        </div>
                      </div>
                    )}
                    {rowData.options && rowData.options.length > 0 && (
                      <div>
                        <span className="text-gray-400 block mb-1">{t.productionInsideCastle}:</span>
                        <div className="flex flex-wrap gap-1">
                        {rowData.options.map((option: boolean, index: number) => {
                          const resourceNames = [t.wood, t.wheat, t.iron, t.diamond];
                          return (
                            <span key={index} className={`px-2 py-1 rounded text-xs ${option ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {resourceNames[index] || `Option ${index + 1}`}: {option ? t.active : t.inactive}
                            </span>
                          );
                        })}
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-3">
                      {t.createdOn} {new Date(row.created_at).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;