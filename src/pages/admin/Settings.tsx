import { useState, useEffect } from 'react';
import { Save, Globe, Mail, DollarSign, Shield } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import type { PlatformSettings } from '../../types/admin';
import { Button } from '../../components/ui';

export function Settings() {
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setSaving(true);
      await adminApi.updateSettings(settings);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Configurações da Plataforma
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie as configurações gerais do EduKanda
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>

        {/* Informações Gerais */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Informações Gerais
          </h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Nome da Plataforma</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="form-label">Descrição</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="input-field"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Emails de Contato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Email de Contato</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="form-label">Email de Suporte</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Redes Sociais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Facebook</label>
              <input
                type="url"
                value={settings.socialMedia.facebook || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                })}
                className="input-field"
                placeholder="https://facebook.com/edukanda"
              />
            </div>
            <div>
              <label className="form-label">Instagram</label>
              <input
                type="url"
                value={settings.socialMedia.instagram || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                })}
                className="input-field"
                placeholder="https://instagram.com/edukanda"
              />
            </div>
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="card p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Funcionalidades
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.features.allowRegistration}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, allowRegistration: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-900 dark:text-white">Permitir novos registros</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.features.enableCertificates}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, enableCertificates: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-900 dark:text-white">Habilitar certificados</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.features.enableRanking}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, enableRanking: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-900 dark:text-white">Habilitar ranking</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.features.enableReviews}
                onChange={(e) => setSettings({
                  ...settings,
                  features: { ...settings.features, enableReviews: e.target.checked }
                })}
                className="w-4 h-4 text-primary-600 rounded"
              />
              <span className="text-sm text-gray-900 dark:text-white">Habilitar avaliações</span>
            </label>
          </div>
        </div>

        {/* Pagamentos */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Configurações de Pagamento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Moeda</label>
              <input
                type="text"
                value={settings.payment.currency}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, currency: e.target.value }
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="form-label">Taxa de Comissão (%)</label>
              <input
                type="number"
                value={settings.payment.commissionRate}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, commissionRate: Number(e.target.value) }
                })}
                className="input-field"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="form-label">Saque Mínimo (Kz)</label>
              <input
                type="number"
                value={settings.payment.minWithdrawal}
                onChange={(e) => setSettings({
                  ...settings,
                  payment: { ...settings.payment, minWithdrawal: Number(e.target.value) }
                })}
                className="input-field"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
